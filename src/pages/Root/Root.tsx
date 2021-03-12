import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE, STORAGE_KEYS } from '@static/index'
import { status } from '@selectors/solanaWallet'
import Main from '@pages/Main/Main'
import Enable from '@pages/Enable/Enable'
import Initialize from '@pages/Initialize/Initialize'
import Confirm from '@pages/Confirm/Confirm'
import Hardware from '@pages/Hardware/Hardware'
import { Status } from '@reducers/solanaWallet'
import EventsHandlers from '@containers/EventsHandlers'
import bg from '@static/jpg/bg.jpg'
import GlobalLoader from '@containers/GlobalLoader/GlobalLoader'

export interface IData {
  type: ACTION_TYPE
  id: string
  data: any
}
export const Root: React.FC = () => {
  const classes = useStyles()
  const [data, setData] = React.useState<IData>()
  const [isHardware, setIsHardware] = React.useState<boolean | undefined>()
  const initialized = useSelector(status)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(solanaConnectionActions.initSolanaConnection())
    // const a = async () => {
    //   // @ts-expect-error
    //   console.log(navigator.usb)
    //   await connect()
    // }
    // a()
  }, [dispatch])

  React.useEffect(() => {
    // chrome.storage.local.set({ hardware: 'init' })

    chrome.storage.local.get(STORAGE_KEYS.CONNECT, function (d) {
      const _data = d[STORAGE_KEYS.CONNECT]
      console.log(_data)
      if (_data === null || _data === undefined) {
        setIsHardware(false)
      } else {
        // setData(_data)
        setIsHardware(true)
      }
      chrome.storage.local.set({ [STORAGE_KEYS.CONNECT]: null })
    })
    // chrome.storage.local.set({ key: null })

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
        return (
          <>
            <Main />
            <EventsHandlers />
          </>
        )
    }
  }
  return (
    <Grid
      container
      style={{
        width: 360,
        height: 600,
        backgroundImage: `url(${bg})`,
        overflow: 'hidden',
        position: 'relative'
      }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: -20,
          right: -15,
          overflow: 'scroll'
        }}
        // onClick={async () => {
        //   // chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/popup.html` })
        //   const wa = new LedgerWalletProvider()
        //   console.log(wa)
        //   console.log(await wa.init())
        //   console.log(wa.publicKey?.toString())
        //   console.log(chrome.runtime.id)
        //   // // @ts-expect-error
        //   // let devices = await navigator.usb.getDevices()
        //   // console.log(devices)
        //   // console.log('connect')
        //   // // @ts-expect-error
        //   // console.log(navigator.usb)
        //   // await connect()
        // }}
      >
        {isHardware === false ? (
          <>
            {initialized === Status.Uninitialized && <Initialize />}
            {data !== undefined && initialized !== Status.Uninitialized && dataToComponent(data)}
          </>
        ) : (
          <Hardware />
        )}
        <GlobalLoader></GlobalLoader>
      </div>
    </Grid>
  )
}
export default Root
