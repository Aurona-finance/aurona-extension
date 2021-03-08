import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address, balance } from '@selectors/solanaWallet'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'
import Header from '@containers/Header/Header'
import MainComponent from '@components/Main/Main'

export const Main: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  // React.useEffect(() => {
  //   dispatch(solanaConnectionActions.initSolanaConnection())
  // }, [dispatch])
  return (
    <>
      <Header />
      <MainComponent
        address={userAddress}
        balance={(userBalance.toNumber() / 1e9).toString()}
        onSend={() => {}}
      />
    </>
  )
}
export default Main
