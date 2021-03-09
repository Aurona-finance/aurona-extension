import React from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as walletActions } from '@reducers/solanaWallet'
import { position } from '@selectors/ui'
import Header from '@containers/Header/Header'
import MainContainer from '@containers/Main/Main'
import AssetsListContainer from '@containers/AssetsList/AssetsList'
import AddAccountContainer from '@containers/AddAccount/AddAccount'
import SendToken from '@containers/SendToken/SendToken'
import { UI_POSITION } from '@reducers/ui'

export const Main: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const uiPosition = useSelector(position)
  React.useEffect(() => {
    dispatch(walletActions.initWallet())
  }, [dispatch])
  const positionToComponent = (position: UI_POSITION) => {
    switch (position) {
      case UI_POSITION.MAIN:
        return (
          <>
            <MainContainer />
            <AssetsListContainer />
          </>
        )
      case UI_POSITION.CREATE_ACCOUNT:
        return (
          <>
            <AddAccountContainer />
          </>
        )
      case UI_POSITION.SEND:
        return (
          <>
            <SendToken />
          </>
        )
      default:
        return <></>
    }
  }
  return (
    <>
      <Header />
      {positionToComponent(uiPosition)}
    </>
  )
}
export default Main
