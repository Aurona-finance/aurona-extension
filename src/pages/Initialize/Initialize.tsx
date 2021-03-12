import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { getHotAccount } from '@web3/solana/wallet'
import {
  getDataExtensionStorage,
  getNonce,
  getStoredWallets,
  retrieveCurrentAccount
} from '@static/utils'
import Loading from '@components/Loading/Loading'
import Create from '@containers/Create/Create'
import Unlock from '@containers/Unlock/Unlock'
import { actions, Status } from '@reducers/solanaWallet'
import * as R from 'remeda'
enum Steps {
  Loading,
  Creation,
  Unlock
}
export const Initialize: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [step, setStep] = useState<Steps>(Steps.Loading)

  React.useEffect(() => {
    const init = async () => {
      try {
        const wallets = await getStoredWallets()
        // We dont have any wallets
        if (Object.keys(wallets).length === 0) {
          setStep(Steps.Creation)
        } else {
          const a = await retrieveCurrentAccount()
          console.log(a)
          dispatch(actions.setAddress(a.publicKey.toString()))
          dispatch(actions.setStatus(Status.Initalized))
        }
      } catch (error) {
        console.log(error)
        setStep(Steps.Unlock)
      }
    }
    init()
  }, [])
  const stepToComponent = (step: Steps) => {
    switch (step) {
      case Steps.Creation:
        return <Create />
      case Steps.Unlock:
        return <Unlock />
      default:
        return <Loading />
    }
  }
  return <>{stepToComponent(step)}</>
}
export default Initialize
