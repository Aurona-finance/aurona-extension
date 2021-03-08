import React from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as walletActions } from '@reducers/solanaWallet'
import { accountsWithSol, address, balance } from '@selectors/solanaWallet'
import Header from '@containers/Header/Header'
import MainComponent from '@components/Main/Main'
import AssetsList from '@components/AssetsList/AssetsList'

export const Main: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const tokens = useSelector(accountsWithSol)
  React.useEffect(() => {
    dispatch(walletActions.initWallet())
  }, [dispatch])
  return (
    <>
      <Header />
      <MainComponent
        address={userAddress}
        balance={(userBalance.toNumber() / 1e9).toString()}
        onSend={() => {}}
      />
      <AssetsList onTokenClick={() => {}} tokens={tokens} onAddAccount={() => {}}></AssetsList>
    </>
  )
}
export default Main
