import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { reducer as uiReducer, uiSliceName } from './ui'
const authPersistConfig = {
  key: 'localStorage',
  storage: localStorage
}
const uiPersist = {
  key: 'ui',
  storage: storage
}
const persistSolanaNetwork = {
  key: solanaConnectionSliceName,
  storage: storage,
  whitelist: ['navigation']
}

const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: persistReducer(uiPersist, uiReducer),
  [solanaConnectionSliceName]: persistReducer(persistSolanaNetwork, solanaConnectionReducer),
  [solanaWalletSliceName]: solanaWalletReducer
})
export default combinedReducers
