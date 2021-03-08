import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { status } from '@selectors/solanaWallet'
import Main from '@pages/Main/Main'
import Enable from '@pages/Enable/Enable'
import Initialize from '@pages/Initialize/Initialize'
import Confirm from '@pages/Confirm/Confirm'
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
  const initialized = useSelector(status)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

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
        }}>
        {initialized === Status.Uninitialized && <Initialize />}
        {data !== undefined && initialized === Status.Initalized && dataToComponent(data)}
        <GlobalLoader></GlobalLoader>
      </div>
    </Grid>
  )
}
export default Root
