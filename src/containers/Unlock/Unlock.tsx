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
        const unlockedWallet = await retrieveColdCurrentAccount(password)
        console.log(unlockedWallet)
        dispatch(actions.setStatus(Status.Initalized))
      }}
    />
  )
}
export default Unlock
