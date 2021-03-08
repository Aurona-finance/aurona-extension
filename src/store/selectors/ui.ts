import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader, position, loadingTokens } = keySelectors(store, [
  'loader',
  'position',
  'loadingTokens'
])

export const navigationSelectors = { loader, position, loadingTokens }

export default navigationSelectors
