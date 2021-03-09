import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@static/index'
import BN from 'bn.js'
import { PayloadType } from './types'

export enum UI_POSITION {
  MAIN,
  CREATE_ACCOUNT,
  SEND
}
export interface Loader {
  open: boolean
  message?: string
}
export interface ISendToken {
  tokenAddress: PublicKey
  recipient: PublicKey
  amount: BN
}
export interface IUIStore {
  loader: Loader
  position: UI_POSITION
  loadingTokens: boolean
  sendToken: ISendToken
}

export const defaultState: IUIStore = {
  loader: { open: false, message: '' },
  position: UI_POSITION.MAIN,
  loadingTokens: true,
  sendToken: { amount: new BN(0), recipient: DEFAULT_PUBLICKEY, tokenAddress: DEFAULT_PUBLICKEY }
}
export const uiSliceName = 'ui'
const uiSlice = createSlice({
  name: uiSliceName,
  initialState: defaultState,
  reducers: {
    setLoader(state, action: PayloadAction<Loader>) {
      state.loader = action.payload
      return state
    },
    setUiPosition(state, action: PayloadAction<UI_POSITION>) {
      state.position = action.payload
      return state
    },
    setLoadingToken(state, action: PayloadAction<boolean>) {
      state.loadingTokens = action.payload
      return state
    },
    openSendToken(state, action: PayloadAction<PublicKey>) {
      state.position = UI_POSITION.SEND
      state.sendToken.tokenAddress = action.payload
      return state
    },
    sendToken(state, action: PayloadAction<Omit<ISendToken, 'tokenAddress'>>) {
      state.sendToken.amount = action.payload.amount
      state.sendToken.recipient = action.payload.recipient
      return state
    }
  }
})

export const actions = uiSlice.actions
export const reducer = uiSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
