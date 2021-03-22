import React from 'react'
import UnlockComponent from '@components/Unlock/Unlock'
import { actions, Status } from '@reducers/solanaWallet'
import { useDispatch } from 'react-redux'
import { getNonce, retrieveColdCurrentAccount, retrieveCurrentAccount, storeHotPassword } from '@static/utils'
export const Unlock: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <UnlockComponent
      onClick={async password => {
        await storeHotPassword(password)
        await retrieveColdCurrentAccount(password)
        dispatch(actions.setStatus(Status.Initalized))
      }}
    />
  )
}
export default Unlock
