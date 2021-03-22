import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { AccountLayout, Token } from '@solana/spl-token'
import { getSolanaConnection } from '@web3/solana/connection'
import BN from 'bn.js'
import { tou64 } from '@static/utils'

interface IcreateAccountInstruction {
  programId: PublicKey
  mint: PublicKey
  account: PublicKey
  owner: PublicKey
}
export const createAccountInstruction = async ({
  programId,
  mint,
  account,
  owner
}: IcreateAccountInstruction) => {
  const connection = await getSolanaConnection()
  const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(connection)

  const tx = new Transaction()
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: account,
      lamports: balanceNeeded,
      space: AccountLayout.span,
      programId: programId
    })
  )
  const ix = Token.createInitAccountInstruction(programId, mint, account, owner)
  return tx.add(ix)
}
interface IcreateSendTokenInstruction {
  programId: PublicKey
  from: PublicKey
  to: PublicKey
  multiSigners?: []
  owner: PublicKey
  amount: BN
}
export const createSendTokenInstruction = async ({
  programId,
  from,
  to,
  multiSigners = [],
  owner,
  amount
}: IcreateSendTokenInstruction) => {
  const ix = Token.createTransferInstruction(
    programId,
    from,
    to,
    owner,
    multiSigners,
    tou64(amount)
  )
  return ix
}

interface IcreateSendSolInstruction {
  from: PublicKey
  to: PublicKey
  amount: BN
}
export const createSendSolInstruction = async ({ from, to, amount }: IcreateSendSolInstruction) => {
  const ix = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amount.toNumber()
    })
  )
  return ix
}
interface IbuildTransaction {
  tx: Transaction
  signers: PublicKey[]
}
export const buildTransaction = async ({ tx, signers }: IbuildTransaction) => {
  tx.setSigners(...signers)
  const connection = await getSolanaConnection()
  const blockhash = await connection.getRecentBlockhash()
  tx.recentBlockhash = blockhash.blockhash
  return tx
}
