import { actions, PayloadTypes, UI_POSITION } from '@reducers/ui'
import uiSelectors from '@selectors/ui'
import { PayloadAction } from '@reduxjs/toolkit'
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js'
import { getConnection } from './connection'
import { getWallet } from './wallet'
import { all, call, put, select, spawn, takeLatest } from 'typed-redux-saga'
import { tokenAccount } from '@selectors/solanaWallet'
import { DEFAULT_PUBLICKEY } from '@static/index'
import { sendSol, sendToken } from './utils'
import BN from 'bn.js'

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
      yield* call(sendSol, amountToSend, sendTokenData.recipient)
    } else {
      // Send token
      const txid = yield* call(
        sendToken,
        userTokenAccount.address,
        sendTokenData.recipient,
        sendTokenData.amount,
        userTokenAccount.programId
      )
    }
  } catch (error) {}
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
