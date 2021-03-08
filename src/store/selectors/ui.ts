import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader, position } = keySelectors(store, ['loader', 'position'])

export const navigationSelectors = { loader, position }

export default navigationSelectors
