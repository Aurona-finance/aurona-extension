import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'
import { transactionsSaga } from './transactions'

export function* solanaRootSaga(): Generator {
  yield all([connectionSaga, walletSaga, transactionsSaga].map(spawn))
}
export default solanaRootSaga
