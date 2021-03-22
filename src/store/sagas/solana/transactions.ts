import { actions, PayloadTypes, UI_POSITION } from '@reducers/ui'
import uiSelectors from '@selectors/ui'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  Transaction,
  SystemProgram,
  PublicKey,
  sendAndConfirmRawTransaction
} from '@solana/web3.js'
import { getConnection } from './connection'
import { getWallet } from './wallet'
import { all, call, put, select, spawn, takeLatest } from 'typed-redux-saga'
import { tokenAccount } from '@selectors/solanaWallet'
import { DEFAULT_PUBLICKEY } from '@static/index'
import { sendSol, sendToken } from './utils'
import BN from 'bn.js'
import {
  buildTransaction,
  createSendSolInstruction,
  createSendTokenInstruction
} from './instructions'
import { LedgerWalletProvider } from '@web3/hardware/walletProvider/ledger'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { actions as snackbarsActions } from '@reducers/snackbars'

export function* handleSendToken(): Generator {
  yield* put(
    actions.setLoader({
      open: true,
      message: 'Sending Transaction'
    })
  )
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const sendTokenData = yield* select(uiSelectors.sendToken)
  const userTokenAccount = yield* select(tokenAccount(sendTokenData.tokenAddress))
  try {
    if (userTokenAccount.programId.equals(DEFAULT_PUBLICKEY)) {
      // Send SOL
      const blockHash = yield* call([connection, connection.getRecentBlockhash])
      const transferFee = new BN(blockHash.feeCalculator.lamportsPerSignature)
      let amountToSend: BN
      if (sendTokenData.amount.add(transferFee).gt(userTokenAccount.balance)) {
        amountToSend = userTokenAccount.balance.sub(transferFee)
      } else {
        amountToSend = sendTokenData.amount
      }
      const ix = yield* call(createSendSolInstruction, {
        from: wallet.publicKey,
        to: sendTokenData.recipient,
        amount: amountToSend
      })
      if (wallet.type === 'aurona') {
        const tx = yield* call(buildTransaction, {
          signers: [wallet.account.publicKey],
          tx: new Transaction().add(ix)
        })
        tx.partialSign(wallet.account)
        const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
      }
      if (wallet.type === 'ledger') {
        const tx = yield* call(buildTransaction, {
          signers: [wallet.publicKey],
          tx: new Transaction().add(ix)
        })
        const hw = new LedgerWalletProvider()
        yield* call([hw, hw.init])
        yield* call([hw, hw.signTransaction], tx)
        const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
      }
    } else {
      // Send token
      const ix = yield* call(createSendTokenInstruction, {
        amount: sendTokenData.amount,
        from: userTokenAccount.address,
        to: sendTokenData.recipient,
        owner: wallet.publicKey,
        programId: TOKEN_PROGRAM_ID
      })
      if (wallet.type === 'aurona') {
        const tx = yield* call(buildTransaction, {
          signers: [wallet.account.publicKey],
          tx: new Transaction().add(ix)
        })
        tx.partialSign(wallet.account)
        const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
      }
      if (wallet.type === 'ledger') {
        const tx = yield* call(buildTransaction, {
          signers: [wallet.publicKey],
          tx: new Transaction().add(ix)
        })
        const hw = new LedgerWalletProvider()
        yield* call([hw, hw.init])
        yield* call([hw, hw.signTransaction], tx)
        const signature = yield* call(sendAndConfirmRawTransaction, connection, tx.serialize())
      }
    }
  } catch (error) {
    yield* put(
      snackbarsActions.add({
        message: 'Transaction failed',
        variant: 'error',
        persist: false
      })
    )
  }

  yield* put(actions.setUiPosition(UI_POSITION.MAIN))
  yield* put(
    actions.setLoader({
      open: false,
      message: ''
    })
  )
}

export function* sendTokenHandler(): Generator {
  yield takeLatest(actions.sendToken, handleSendToken)
}
export function* transactionsSaga(): Generator {
  yield all([sendTokenHandler].map(spawn))
}
