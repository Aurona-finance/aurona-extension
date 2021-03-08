import React from 'react'
import UnlockComponent from '@components/Unlock/Unlock'
import { actions, Status } from '@reducers/solanaWallet'
import { useDispatch } from 'react-redux'
import { getColdAccount } from '@web3/solana/wallet'
export const Unlock: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <UnlockComponent
      onClick={async password => {
        await getColdAccount(password)
        dispatch(actions.setStatus(Status.Initalized))
      }}
    />
  )
}
export default Unlock
