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
// chrome.storage.local.get(['persist:localStorage'], items => {
//   console.log(items)
//   console.log('#################')
//   // const rootParsed = JSON.parse(items['persist:localStorage'])

//   // Keep in mind that each reducer must be parsed separately
//   // const someReducer = JSON.parse(parsed.someReducer)

//   // `someReducer` will be the contents of the reducer of that name when last persisted
// })
const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: persistReducer(uiPersist, uiReducer),
  [solanaConnectionSliceName]: solanaConnectionReducer,
  // [solanaWalletSliceName]: persistReducer(authPersistConfig, solanaWalletReducer)
  [solanaWalletSliceName]: solanaWalletReducer
})
export default combinedReducers
