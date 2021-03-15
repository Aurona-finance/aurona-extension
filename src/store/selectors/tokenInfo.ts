import { createSelector } from '@reduxjs/toolkit'
import { SolanaNetworks } from '@static/index'
import { ITokenInfo, tokenInfoSliceName } from '../reducers/tokenInfo'
import { keySelectors, AnyProps } from './helpers'
import { network } from './solanaConnection'

const store = (s: AnyProps) => s[tokenInfoSliceName] as ITokenInfo

export const { tokens } = keySelectors(store, ['tokens'])

export const networkTokens = createSelector(network, tokens, (currentNetwork, allTokens) => {
  switch (currentNetwork) {
    case SolanaNetworks.TEST:
      return allTokens.filter(t => t.chainId === 102)
    case SolanaNetworks.MAIN:
      return allTokens.filter(t => t.chainId === 101)
    case SolanaNetworks.DEV:
      return allTokens.filter(t => t.chainId === 103)
  }
})

export const tokenInfoSelectors = { tokens }

export default tokenInfoSelectors
