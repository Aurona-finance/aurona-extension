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
import { getSolanaWallet } from '@web3/solana/wallet'
import { Account, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { actions as uiActions, UI_POSITION } from '@reducers/ui'

import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status } from '@reducers/solanaConnection'
// import { createToken } from './token'
import BN from 'bn.js'
import { TOKEN_PROGRAM_ID } from '@static/index'
import { sleep, tou64 } from '@static/utils'

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
      // const signature = yield* call(
      //   sendToken,
      //   action.payload.accountAddress,
      //   action.payload.recipient,
      //   action.payload.amount * 1e9,
      //   action.payload.token
      // )
      // yield put(
      //   actions.setTransactionTxid({
      //     txid: signature,
      //     id: action.payload.id
      //   })
      // )
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
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID
    }
  )
  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield* put(
      actions.addTokenAccount({
        programId: new PublicKey(info.mint),
        balance: new BN(info.tokenAmount.amount),
        address: account.pubkey,
        decimals: info.tokenAmount.decimals
      })
    )
  }
}

export function* getToken(tokenAddress: PublicKey): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  console.log(TOKEN_PROGRAM_ID.toString())
  const token = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, wallet)
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
  from: PublicKey,
  target: PublicKey,
  amount: BN,
  tokenAddress: PublicKey
): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)
  const signature = yield* call([token, token.transfer], from, target, wallet, [], tou64(amount))
  return signature
}
export function* createAccount(tokenAddress: PublicKey): SagaGenerator<PublicKey> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)
  const connection = yield* call(getConnection)
  // const as = yield* call(
  //   [Token, Token.createMint],
  //   connection,
  //   wallet,
  //   wallet.publicKey,
  //   wallet.publicKey,
  //   10,
  //   new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
  // )
  // console.log(as)
  console.log(yield* call([token, token.createAccount], wallet.publicKey))
  const address = yield* call([token, token.createAccount], wallet.publicKey)
  console.log(address)
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: new BN(0),
      address: address,
      decimals: 8
    })
  )
  yield* call(sleep, 1000) // Give time to subscribe to new token
  return address
}

export function* init(): Generator {
  yield* put(
    uiActions.setLoader({
      open: true,
      message: ''
    })
  )
  const wallet = yield* call(getWallet)
  const balance = yield* call(getBalance, wallet.publicKey)
  // yield* call(fetchTokensAccounts)
  // const store = yield* select(address)
  // console.log(store)
  yield* put(actions.setAddress(wallet.publicKey.toString()))
  yield* put(actions.setBalance(new BN(balance)))
  yield* put(actions.setStatus(Status.Initalized))
  yield* put(
    uiActions.setLoader({
      open: false,
      message: ''
    })
  )
  // yield* call(handleAirdrop)
}

export function* handleCreateAccount(
  action: PayloadAction<PayloadTypes['createAccount']>
): Generator {
  try {
    yield* put(
      uiActions.setLoader({
        open: true,
        message: ''
      })
    )
    console.log(action.payload.toString())
    yield* call(createAccount, action.payload)
    yield* put(uiActions.setUiPosition(UI_POSITION.MAIN))
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
  } catch (error) {
    console.log(error)
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
  }
}
export function* aridropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* transactionsSaga(): Generator {
  yield takeEvery(actions.addTransaction, handleTransaction)
}
export function* createAccountHandler(): Generator {
  yield takeLeading(actions.createAccount, handleCreateAccount)
}
export function* handleInitWallet(): Generator {
  yield takeLeading(actions.initWallet, init)
}
export function* walletSaga(): Generator {
  yield all([transactionsSaga, aridropSaga, handleInitWallet, createAccountHandler].map(spawn))
}
