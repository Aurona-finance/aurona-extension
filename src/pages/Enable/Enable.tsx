import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE, SolanaNetworks } from '@static/index'
import { address } from '@selectors/solanaWallet'
import { IData } from '../Root/Root'
import Header from '@components/Header/Header'
import EnableComponent from '@components/Enable/Enable'
import { getSolanaWallet } from '@web3/solana/wallet'
import { getDataExtensionStorage, retrieveCurrentAccount } from '@static/utils'
import { actions } from '@reducers/solanaConnection'
import { network } from '@selectors/solanaConnection'
import useStyles from './style'

interface IEnable {
  data: IData
}

export const Enable: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const currentNetwork = useSelector(network)
  console.log(data)
  // Hook auto enable
  // React.useEffect(() => {
  //   if (data.type === ACTION_TYPE.ENABLE && !!userAddress) {
  //     chrome.runtime.sendMessage({
  //       ...data,
  //       userAddress: userAddress,
  //       type: ACTION_TYPE.ENABLE_DONE
  //     })
  //     window.close()
  //   }
  // }, [dispatch, userAddress])
  return (
    <>
      <Header
        network={currentNetwork}
        disableActions
        onNetworkChange={(network: SolanaNetworks) => {
          if (network !== currentNetwork) {
            dispatch(actions.changeNetwork(network))
          }
        }}></Header>
      <EnableComponent
        website={data.data.host}
        onConfirm={async () => {
          const wallet = await retrieveCurrentAccount()
          const network = await getDataExtensionStorage('network')
          chrome.runtime.sendMessage({
            ...data,
            data: 'enabled',
            userAddress: wallet.publicKey.toString(),
            network: network || SolanaNetworks.DEV,
            type: ACTION_TYPE.ENABLE_DONE
          })
          window.close()
        }}
        onReject={async () => {
          chrome.runtime.sendMessage({
            ...data,
            data: null,
            userAddress: userAddress,
            type: ACTION_TYPE.ENABLE_DONE
          })
          window.close()
        }}></EnableComponent>
    </>
  )
}
export default Enable
