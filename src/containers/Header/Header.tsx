import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { network } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaConnection'
import { SolanaNetworks } from '@static/index'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const currentNetwork = useSelector(network)

  return (
    <Header
      onNetworkClick={(network: SolanaNetworks) => {
        if (network !== currentNetwork) {
          dispatch(actions.changeNetwork(network))
        }
      }}
      network={currentNetwork}
    />
  )
}

export default HeaderWrapper
