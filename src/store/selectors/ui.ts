import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader, position, loadingTokens, sendToken, tokenDetails } = keySelectors(store, [
  'loader',
  'position',
  'loadingTokens',
  'sendToken',
  'tokenDetails'
])

export const navigationSelectors = { loader, position, loadingTokens, sendToken }

export default navigationSelectors
