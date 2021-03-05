import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address } from '@selectors/solanaWallet'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'

export const Main: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  // React.useEffect(() => {
  //   dispatch(solanaConnectionActions.initSolanaConnection())
  // }, [dispatch])
  return (
    <Grid container className={classes.root}>
      <div style={{ height: 300, width: 300, backgroundColor: 'green' }}>MAIN</div>
    </Grid>
  )
}
export default Main
