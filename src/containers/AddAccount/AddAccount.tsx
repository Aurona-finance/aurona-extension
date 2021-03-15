import React from 'react'

import AddAccount from '@components/AddAccount/AddAccount'
import { useDispatch, useSelector } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { actions as walletActions } from '@reducers/solanaWallet'
import { networkTokens } from '@selectors/tokenInfo'

export const AssetsList: React.FC = () => {
  const dispatch = useDispatch()
  const tokens = useSelector(networkTokens)
  return (
    <AddAccount
      tokens={tokens}
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
