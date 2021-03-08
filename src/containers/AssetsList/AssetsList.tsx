import React from 'react'

import AssetsListComponent from '@components/AssetsList/AssetsList'
import { useDispatch, useSelector } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { accountsWithSol } from '@selectors/solanaWallet'

export const AssetsList: React.FC = () => {
  const dispatch = useDispatch()
  const tokens = useSelector(accountsWithSol)
  return (
    <AssetsListComponent
      onTokenClick={() => {}}
      tokens={tokens}
      onAddAccount={() => {
        dispatch(actions.setUiPosition(UI_POSITION.CREATE_ACCOUNT))
      }}
    />
  )
}

export default AssetsList
