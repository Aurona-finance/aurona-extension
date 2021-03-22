/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
import {
  TransactionInstruction,
  SystemInstruction,
  SystemProgram,
  PublicKey
} from '@solana/web3.js'
import { option, publicKey, rustEnum, u64, struct, u8, EnumLayout } from '@project-serum/borsh'
import BN from 'bn.js'
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import { getCurrentSolanaConnection, getSolanaConnection } from '@web3/solana/connection'
import { printBN } from './utils'
import { TokenInfo } from '@solana/spl-token-registry'

export type TokenInstructionLayoutType =
  | {
      initializeMint: {
        decimals: number
        mintAuthority: PublicKey
        freezeAuthority: PublicKey | null
      }
    }
  | { initializeAccount: any }
  | { initializeMultisig: { m: number } }
  | { transfer: { amount: BN } }
  | { approve: { amount: BN } }
  | { revoke: any }
  | { setAuthority: { authorityType: number; newAuthority: PublicKey | null } }
  | { mintTo: { amount: BN } }
  | { burn: { amount: BN } }
  | { closeAccount: any }
  | { freezeAccount: any }
  | { thawAccount: any }
  | { transferChecked: { amount: BN; decimals: number } }
  | { approveChecked: { amount: BN; decimals: number } }
  | { mintToChecked: { amount: BN; decimals: number } }
  | { burnChecked: { amount: BN; decimals: number } }

export const TokenInstructionLayout: EnumLayout<TokenInstructionLayoutType> = rustEnum([
  struct(
    [u8('decimals'), publicKey('mintAuthority'), option(publicKey(), 'freezeAuthority')],
    'initializeMint'
  ),
  struct([], 'initializeAccount'),
  struct([u8('m')], 'initializeMultisig'),
  struct([u64('amount')], 'transfer'),
  struct([u64('amount')], 'approve'),
  struct([], 'revoke'),
  struct([u8('authorityType'), option(publicKey(), 'newAuthority')], 'setAuthority'),
  struct([u64('amount')], 'mintTo'),
  struct([u64('amount')], 'burn'),
  struct([], 'closeAccount'),
  struct([], 'freezeAccount'),
  struct([], 'thawAccount'),
  struct([u64('amount'), u8('decimals')], 'transferChecked'),
  struct([u64('amount'), u8('decimals')], 'approveChecked'),
  struct([u64('amount'), u8('decimals')], 'mintToChecked'),
  struct([u64('amount'), u8('decimals')], 'burnChecked')
])
// TokenInstructionLayout.decode()
export interface IDecodedTransaction {
  operation: string
  text: string
  amount: BN
}
export const decodeTransaction = async (
  instruction: TransactionInstruction,
  tokensData: TokenInfo[]
): Promise<IDecodedTransaction> => {
  // SystemProgram
  try {
    if (instruction.programId.equals(SystemProgram.programId)) {
      const type = SystemInstruction.decodeInstructionType(instruction)
      let decoded
      switch (type) {
        case 'Create':
          decoded = SystemInstruction.decodeCreateAccount(instruction)
          return {
            amount: new BN(decoded.lamports),
            operation: type,
            text: 'Create new program account.'
          }
        case 'CreateWithSeed':
          decoded = SystemInstruction.decodeCreateWithSeed(instruction)
          return {
            amount: new BN(decoded.lamports),
            operation: type,
            text: 'Create new program account.'
          }
        case 'Allocate':
          decoded = SystemInstruction.decodeAllocate(instruction)
          return { amount: new BN(0), operation: type, text: 'Allocate account.' }
        case 'AllocateWithSeed':
          decoded = SystemInstruction.decodeAllocateWithSeed(instruction)
          return { amount: new BN(0), operation: type, text: 'Allocate account.' }
        case 'Assign':
          decoded = SystemInstruction.decodeAssign(instruction)
          return {
            amount: new BN(0),
            operation: type,
            text: `Assign ${decoded.accountPubkey.toString()}`
          }
        case 'AssignWithSeed':
          decoded = SystemInstruction.decodeAssignWithSeed(instruction)
          return {
            amount: new BN(0),
            operation: type,
            text: `Assign ${decoded.accountPubkey.toString()}`
          }
        case 'Transfer':
          decoded = SystemInstruction.decodeTransfer(instruction)
          return {
            amount: new BN(decoded.lamports),
            operation: type,
            text: `Transfer ${printBN(
              new BN(decoded.lamports),
              9
            )} SOL to ${decoded.toPubkey.toString()}`
          }
        case 'AdvanceNonceAccount':
          decoded = SystemInstruction.decodeNonceAdvance(instruction)
          return {
            amount: new BN(0),
            operation: type,
            text: 'AdvanceNonceAccount'
          }
        case 'WithdrawNonceAccount':
          decoded = SystemInstruction.decodeNonceWithdraw(instruction)
          return {
            amount: new BN(decoded.lamports),
            operation: type,
            text: 'WithdrawNonceAccount'
          }
        case 'InitializeNonceAccount':
          decoded = SystemInstruction.decodeNonceInitialize(instruction)
          return {
            amount: new BN(0),
            operation: type,
            text: 'InitializeNonceAccount'
          }
        case 'AuthorizeNonceAccount':
          decoded = SystemInstruction.decodeNonceAuthorize(instruction)
          return {
            amount: new BN(0),
            operation: type,
            text: 'AuthorizeNonceAccount'
          }
      }
    }
    if (instruction.programId.equals(TOKEN_PROGRAM_ID)) {
      const operation = await decodeTokenInstruction(instruction, tokensData)
      return operation
    }
  } catch (error) {
    return { amount: new BN(0), operation: 'Unknown', text: 'Unknown Operation' }
  }
  return { amount: new BN(0), operation: 'Unknown', text: 'Unknown Operation' }
}

const getTokenInfo = async (tokenAccount: PublicKey, tokensData: TokenInfo[]) => {
  const connection = await getSolanaConnection()
  const tokenData = await connection.getTokenAccountBalance(tokenAccount)
  const info = await connection.getParsedAccountInfo(tokenAccount)
  // @ts-expect-error
  const mintAddress: string = info.value.data.parsed.info.mint
  const tokenInfo = tokensData.find(t => t.address === mintAddress)
  const decimals = tokenData.value.decimals
  return { decimals: decimals, symbol: tokenInfo?.symbol }
}
export const decodeTokenInstruction = async (
  instruction: TransactionInstruction,
  tokensData: TokenInfo[]
): Promise<IDecodedTransaction> => {
  const data = TokenInstructionLayout.decode(Buffer.from(instruction.data))
  if ('initializeMint' in data) {
    const type = 'initializeMint'
    return { operation: type, amount: new BN(0), text: 'Create new Token' }
  } else if ('initializeAccount' in data) {
    const type = 'initializeAccount'
    return { operation: type, amount: new BN(0), text: 'Create token account' }
  } else if ('transfer' in data) {
    const type = 'transfer'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)
    return {
      operation: type,
      amount: data.transfer.amount,
      text: `Send ${printBN(data.transfer.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } to ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('approve' in data) {
    const type = 'approve'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.approve.amount,
      text: `Approve ${printBN(data.approve.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } to ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('revoke' in data) {
    const type = 'revoke'
    return {
      operation: type,
      amount: new BN(0),
      text: 'Revoke token approval'
    }
  } else if ('setAuthority' in data) {
    const type = 'setAuthority'
    return {
      operation: type,
      amount: new BN(0),
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      text: `Set authority to ${data.setAuthority.newAuthority?.toString()}`
    }
  } else if ('mintTo' in data) {
    const type = 'mintTo'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.mintTo.amount,
      text: `Mint ${printBN(data.mintTo.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } to ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('burn' in data) {
    const type = 'burn'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.burn.amount,
      text: `Burn ${printBN(
        data.burn.amount,
        tokenInfo.decimals
      )} ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('closeAccount' in data) {
    const type = 'closeAccount'
    return {
      operation: type,
      amount: new BN(0),
      text: `Close account ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('transferChecked' in data) {
    const type = 'transfer'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.transferChecked.amount,
      text: `Send ${printBN(data.transferChecked.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } to ${instruction.keys[2].pubkey.toString()}`
    }
  } else if ('approveChecked' in data) {
    const type = 'approve'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.approveChecked.amount,
      text: `Approve ${printBN(data.approveChecked.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } to ${instruction.keys[2].pubkey.toString()}`
    }
  } else if ('mintToChecked' in data) {
    const type = 'mintTo'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.mintToChecked.amount,
      text: `Mint ${printBN(
        data.mintToChecked.amount,
        tokenInfo.decimals
      )} to ${instruction.keys[1].pubkey.toString()}`
    }
  } else if ('burnChecked' in data) {
    const type = 'burn'
    const tokenInfo = await getTokenInfo(instruction.keys[1].pubkey, tokensData)

    return {
      operation: type,
      amount: data.burnChecked.amount,
      text: `Burn ${printBN(data.burnChecked.amount, tokenInfo.decimals)} ${
        tokenInfo.symbol
      } ${instruction.keys[1].pubkey.toString()}`
    }
  } else {
    return { amount: new BN(0), operation: 'Unknown', text: 'Unknown Operation' }
  }
}
