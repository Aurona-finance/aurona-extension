import React from 'react'

import AssetsListComponent from '@components/AssetsList/AssetsList'
import { useDispatch, useSelector } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { accountsWithSol } from '@selectors/solanaWallet'
import { loadingTokens } from '@selectors/ui'

export const AssetsList: React.FC = () => {
  const dispatch = useDispatch()
  const tokens = useSelector(accountsWithSol)
  const loading = useSelector(loadingTokens)
  return (
    <AssetsListComponent
      onTokenClick={tokenAddress => {
        dispatch(actions.openTokenDetails(tokenAddress))
      }}
      tokens={tokens}
      loading={loading}
      onAddAccount={() => {
        dispatch(actions.setUiPosition(UI_POSITION.CREATE_ACCOUNT))
      }}
    />
  )
}

export default AssetsList
