import React from 'react'

import AddAccount from '@components/AddAccount/AddAccount'
import { useDispatch } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { actions as walletActions } from '@reducers/solanaWallet'

export const AssetsList: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <AddAccount
      onCancel={() => {
        dispatch(actions.setUiPosition(UI_POSITION.MAIN))
      }}
      onConfirm={account => {
        dispatch(walletActions.createAccount(account))
      }}
    />
  )
}

export default AssetsList
