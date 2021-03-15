import React from 'react'

import Send from '@components/Send/Send'
import { useDispatch, useSelector } from 'react-redux'
import { actions, UI_POSITION } from '@reducers/ui'
import { sendToken } from '@selectors/ui'
import { tokenAccount } from '@selectors/solanaWallet'

export const SendToken: React.FC = () => {
  const dispatch = useDispatch()
  const sendTokenData = useSelector(sendToken)
  const token = useSelector(tokenAccount(sendTokenData.tokenAddress))
  return (
    <Send
      balance={token.balance}
      tokenAddress={token.programId}
      ticker={token.symbol}
      decimals={token.decimals}
      onCancel={() => {
        dispatch(actions.setUiPosition(UI_POSITION.MAIN))
      }}
      onSend={(amount, recipient) => {
        dispatch(actions.sendToken({ amount, recipient }))
      }}
    />
  )
}

export default SendToken
