import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { TokenInfo } from '@solana/spl-token-registry'

export interface ITokenInfo {
  tokens: TokenInfo[]
}

export const defaultState: ITokenInfo = {
  tokens: []
}
export const tokenInfoSliceName = 'tokenInfo'
const tokenInfoSlice = createSlice({
  name: tokenInfoSliceName,
  initialState: defaultState,
  reducers: {
    setTokens(state, action: PayloadAction<TokenInfo[]>) {
      state.tokens = action.payload
      return state
    }
  }
})

export const actions = tokenInfoSlice.actions
export const reducer = tokenInfoSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
