import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { status } from '@selectors/solanaWallet'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'
import Main from '@pages/Main/Main'
import Enable from '@pages/Enable/Enable'
import Initialize from '@pages/Initialize/Initialize'
import Confirm from '@pages/Confirm/Confirm'
import { Status } from '@reducers/solanaWallet'
export interface IData {
  type: ACTION_TYPE
  id: string
  data: any
}
export const Root: React.FC = () => {
  const classes = useStyles()
  const [data, setData] = React.useState<IData>()
  const initialized = useSelector(status)
  const dispatch = useDispatch()
  console.log(initialized)
  // Handle open request
  // const userAddress = useSelector(address)
  React.useEffect(() => {
    if (data !== undefined && initialized === Status.Initalized) {
      dispatch(solanaConnectionActions.initSolanaConnection())
    }
  }, [dispatch, initialized, data])
  React.useEffect(() => {
    chrome.storage.local.get('key', function (d) {
      const _data = d.key
      if (_data === null || _data === undefined) {
        setData({ type: ACTION_TYPE.DEFAULT, id: Math.random().toString(), data: null })
      } else {
        setData(_data)
      }
    })
    chrome.storage.local.set({ key: null })
  }, [])
  const dataToComponent = (data: IData) => {
    switch (data.type) {
      case ACTION_TYPE.ENABLE:
        return <Enable data={data} />
      case ACTION_TYPE.REQUEST_NEW:
        return <Confirm data={data} />
      default:
        return <Main />
    }
  }
  return (
    <div style={{ width: 400, height: 600 }}>
      {initialized === Status.Uninitialized && <Initialize />}
      {data !== undefined && initialized === Status.Initalized && dataToComponent(data)}
    </div>
  )
}
export default Root
