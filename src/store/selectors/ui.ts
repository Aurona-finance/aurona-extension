import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader, position, loadingTokens, sendToken } = keySelectors(store, [
  'loader',
  'position',
  'loadingTokens',
  'sendToken'
])

export const navigationSelectors = { loader, position, loadingTokens, sendToken }

export default navigationSelectors
