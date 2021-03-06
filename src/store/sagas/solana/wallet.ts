import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  select,
  takeEvery,
  spawn,
  all
} from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, TokenProgramMap } from '@web3/solana/wallet'
import { Account, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { network } from '@selectors/solanaConnection'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status } from '@reducers/solanaConnection'
import { address } from '@selectors/solanaWallet'
// import { createToken } from './token'
import { BN } from '@project-serum/anchor'

export function* getWallet(): SagaGenerator<Account> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<number> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return balance
}
export function* handleTransaction(
  action: PayloadAction<PayloadTypes['addTransaction']>
): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  // Send token
  try {
    if (action.payload.token && action.payload.accountAddress) {
      const signature = yield* call(
        sendToken,
        action.payload.accountAddress,
        action.payload.recipient,
        action.payload.amount * 1e9,
        action.payload.token
      )
      yield put(
        actions.setTransactionTxid({
          txid: signature,
          id: action.payload.id
        })
      )
    } else {
      // Send SOL
      const signature = yield* call(
        [connection, connection.sendTransaction],
        new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(action.payload.recipient),
            lamports: action.payload.amount * 1e9
          })
        ),
        [wallet],
        {
          preflightCommitment: 'singleGossip'
        }
      )
      yield put(
        actions.setTransactionTxid({
          txid: signature,
          id: action.payload.id
        })
      )
    }
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.setTransactionError({
        error: error,
        id: action.payload.id
      })
    )
  }
}
interface IparsedTokenInfo {
  mint: string
  owner: string
  tokenAmount: {
    amount: string
    decimals: number
    uiAmount: number
  }
}
export function* fetchTokensAccounts(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: new PublicKey(TokenProgramMap[currentNetwork])
    }
  )

  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield put(
      actions.addTokenAccount({
        programId: info.mint,
        balance: parseInt(info.tokenAmount.amount),
        address: account.pubkey.toString(),
        decimals: info.tokenAmount.decimals
      })
    )
  }
}

export function* getToken(tokenAddress: string): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const currentNetwork = yield* select(network)
  const token = new Token(
    connection,
    new PublicKey(tokenAddress),
    new PublicKey(TokenProgramMap[currentNetwork]),
    wallet
  )
  return token
}

export function* handleAirdrop(): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  yield* call([connection, connection.requestAirdrop], wallet.publicKey, 3.33 * 1e9)
  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }
export function* sendToken(
  from: string,
  target: string,
  amount: number,
  tokenAddress: string
): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)
  const signature = yield* call(
    [token, token.transfer],
    new PublicKey(from),
    new PublicKey(target),
    wallet,
    [],
    amount
  )
  return signature
}
export function* createAccount(tokenAddress: string): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)

  const address = yield* call([token, token.createAccount], wallet.publicKey)
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: 0,
      address: address.toString(),
      decimals: 9
    })
  )
  return address.toString()
}

export function* init(): Generator {
  const wallet = yield* call(getWallet)
  const balance = yield* call(getBalance, wallet.publicKey)
  // yield* call(fetchTokensAccounts)
  // const store = yield* select(address)
  // console.log(store)
  yield* put(actions.setAddress(wallet.publicKey.toString()))
  yield* put(actions.setBalance(new BN(balance)))
  yield* put(actions.setStatus(Status.Initalized))
}

export function* aridropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* transactionsSaga(): Generator {
  yield takeEvery(actions.addTransaction, handleTransaction)
}

export function* walletSaga(): Generator {
  yield all([transactionsSaga, aridropSaga].map(spawn))
}
