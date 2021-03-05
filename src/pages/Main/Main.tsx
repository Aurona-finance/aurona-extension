import React, { useState } from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address, balance } from '@selectors/solanaWallet'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'

export const Main: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  React.useEffect(() => {
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])
  return (
    <Grid container direction='column' justify='center'>
      <Grid item>
        <Typography variant='body1'>{'Your address'}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1' color='primary'>{`${userAddress}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>{`Your SOL balance ${
          userBalance.toNumber() / 1e9
        }`}</Typography>
      </Grid>
    </Grid>
  )
}
export default Main
