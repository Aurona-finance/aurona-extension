import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
export interface IUIStore {
  loader: Loader
  position: UI_POSITION
}

export const defaultState: IUIStore = {
  loader: { open: false, message: '' },
  position: UI_POSITION.MAIN
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
    }
  }
})

export const actions = uiSlice.actions
export const reducer = uiSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
