import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  select,
  takeEvery,
  spawn,
  all,
  takeLatest
} from 'typed-redux-saga'

import { actions, PayloadTypes, Status } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet } from '@web3/solana/wallet'
import {
  Account,
  PublicKey,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { actions as uiActions, UI_POSITION } from '@reducers/ui'

import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
// import { createToken } from './token'
import BN from 'bn.js'
import { ACTION_TYPE, DEFAULT_PUBLICKEY, TOKEN_PROGRAM_ID } from '@static/index'
import {
  retrieveCurrentAccount,
  sleep,
  storeCurrentWallet,
  UnlockedAccount,
  UnlockedLedger
} from '@static/utils'
import { address, tokenAccount } from '@selectors/solanaWallet'
import { buildTransaction, createAccountInstruction } from './instructions'
import { LedgerWalletProvider } from '@web3/hardware/walletProvider/ledger'

// export function* getWallet(): SagaGenerator<Account> {
//   const wallet = yield* call(getSolanaWallet)
//   return wallet
// }
export function* getWallet(): SagaGenerator<UnlockedAccount | UnlockedLedger> {
  const wallet = yield* call(retrieveCurrentAccount)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<number> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return balance
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
  yield* put(uiActions.setLoadingToken(true))
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
  yield* put(uiActions.setLoadingToken(false))
}

export function* getToken(tokenAddress: PublicKey, wallet: Account): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const token = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, wallet)
  return token
}

export function* handleAirdrop(): Generator {
  const connection = yield* call(getConnection)
  const userAddress = yield* select(address)
  yield* call([connection, connection.requestAirdrop], new PublicKey(userAddress), 3.33 * 1e9)
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

export function* createAccount(tokenAddress: PublicKey): SagaGenerator<PublicKey> {
  const wallet = yield* call(getWallet)
  const connection = yield* call(getConnection)
  const account = new Account()
  const ix = yield* call(createAccountInstruction, {
    account: account.publicKey,
    mint: tokenAddress,
    owner: wallet.publicKey,
    programId: TOKEN_PROGRAM_ID
  })
  if (wallet.type === 'aurona') {
    const tx = yield* call(buildTransaction, {
      signers: [wallet.account.publicKey, account.publicKey],
      tx: new Transaction().add(ix)
    })
    tx.partialSign(wallet.account)
    tx.partialSign(account)
    const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
    yield* put(
      actions.addTokenAccount({
        programId: tokenAddress,
        balance: new BN(0),
        address: account.publicKey,
        decimals: 8
      })
    )
    yield* call(sleep, 1000) // Give time to subscribe to new token
    // return address
  }
  if (wallet.type === 'ledger') {
    const tx = yield* call(buildTransaction, {
      signers: [wallet.publicKey, account.publicKey],
      tx: new Transaction().add(ix)
    })
    const hw = new LedgerWalletProvider()
    yield* call([hw, hw.init])
    yield* call([hw, hw.signTransaction], tx)
    tx.partialSign(account)
    const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
    yield* put(
      actions.addTokenAccount({
        programId: tokenAddress,
        balance: new BN(0),
        address: account.publicKey,
        decimals: 8
      })
    )
    yield* call(sleep, 1000) // Give time to subscribe to new token
  }
  return account.publicKey
}

export function* init(): Generator {
  yield* put(
    uiActions.setLoader({
      open: true,
      message: ''
    })
  )
  const wallet = yield* call(retrieveCurrentAccount)
  const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setAddress(wallet.publicKey.toString()))
  yield* put(actions.setBalance(new BN(balance)))
  yield* put(actions.setStatus(Status.Initalized))
  yield* put(actions.setType(wallet.type))
  yield* put(
    uiActions.setLoader({
      open: false,
      message: ''
    })
  )
  yield* call(fetchTokensAccounts)
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
    const account = yield* select(tokenAccount(action.payload))
    if (!account.programId.equals(DEFAULT_PUBLICKEY)) {
      yield* put(
        uiActions.setLoader({
          open: false,
          message: ''
        })
      )
      yield* put(
        snackbarsActions.add({
          message: 'Account already exist',
          variant: 'info',
          persist: false
        })
      )
      return
    }
    yield* call(createAccount, action.payload)
    yield* put(uiActions.setUiPosition(UI_POSITION.MAIN))
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
  } catch (error) {
    yield* put(
      snackbarsActions.add({
        message: 'Transaction failed',
        variant: 'error',
        persist: false
      })
    )
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
  }
}

export function* changeWalletHandler(
  action: PayloadAction<PayloadTypes['changeWallet']>
): Generator {
  yield* put(
    uiActions.setLoader({
      open: true,
      message: ''
    })
  )
  yield* call(storeCurrentWallet, action.payload)
  yield* put(actions.resetState())
  yield* put(actions.setStatus(Status.Init))
  chrome.runtime.sendMessage({
    data: action.payload.publicKey,
    type: ACTION_TYPE.WALLET_CHANGE
  })
  yield* put(
    uiActions.setLoader({
      open: false,
      message: ''
    })
  )
}

export function* aridropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* handleChangeWallet(): Generator {
  yield takeLeading(actions.changeWallet, changeWalletHandler)
}

export function* createAccountHandler(): Generator {
  yield takeLeading(actions.createAccount, handleCreateAccount)
}
export function* handleInitWallet(): Generator {
  yield takeLatest(actions.initWallet, init)
}
export function* handleRescanToken(): Generator {
  yield takeLatest(actions.rescanTokens, fetchTokensAccounts)
}
export function* walletSaga(): Generator {
  yield all([aridropSaga, handleInitWallet, createAccountHandler, handleChangeWallet].map(spawn))
}
