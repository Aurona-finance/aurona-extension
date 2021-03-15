import React from 'react'

import AccountDetailsComponent from '@components/AccountDetails/AccountDetails'
import { useDispatch, useSelector } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { tokenDetails } from '@selectors/ui'
import { tokenAccount } from '@selectors/solanaWallet'
import { printBN } from '@static/utils'

export const AccountDetails: React.FC = () => {
  const dispatch = useDispatch()
  const tokenDetailsData = useSelector(tokenDetails)
  const token = useSelector(tokenAccount(tokenDetailsData))
  return (
    <AccountDetailsComponent
      balance={printBN(token.balance, token.decimals)}
      tokenAddress={token.programId.toString()}
      address={token.address.toString()}
      ticker={token.symbol}
      iconURI={token.iconURI}
      onBack={() => {
        dispatch(actions.setUiPosition(UI_POSITION.MAIN))
      }}
      onSend={() => {
        dispatch(actions.openSendToken(token.programId))
      }}
    />
  )
}

export default AccountDetails
