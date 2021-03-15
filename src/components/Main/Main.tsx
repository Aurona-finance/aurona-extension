import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Divider from '@components/Divider/Divider'
import FilledButton from '@components/FilledButton/FilledButton'
import SendIcon from '@material-ui/icons/Send'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import CopyToolTip from '@components/CopyToolTip/CopyToolTip'
import SOL_ICON from '@static/icons/sol.png'
import TokenLogo from '@components/TokenLogo/TokenLogo'
import useStyles from './style'

interface IProps {
  address: string
  balance: string
  balanceUsd?: string
  onSend: () => void
}
export const Main: React.FC<IProps> = ({ balance, balanceUsd, address, onSend }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      // alignItems='center'
      // justify='space-between'
      className={classes.root}>
      <Grid item>
        <Typography variant='body2' className={classes.title}>
          Your Account
        </Typography>
      </Grid>
      <Grid item>
        <CopyToolTip text={address}>
          <Typography variant='body1' className={classes.address}>
            {address}
          </Typography>
        </CopyToolTip>
      </Grid>
      <Divider />
      <Grid item style={{ marginTop: 12 }}>
        <Grid container>
          <Grid item>
            <Grid container wrap='nowrap'>
              <Grid item xs>
                <Typography variant='h1' className={classes.balance}>
                  {`${balance}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h1' className={classes.balanceTicker}>
                  SOL
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginLeft: 15 }}>
            <TokenLogo url={SOL_ICON} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 4 }}>
        <Typography variant='body1' className={classes.usdBalance}>{`${
          balanceUsd || '---'
        } USD`}</Typography>
      </Grid>
      <Divider />
      <Grid item style={{ marginTop: 28, width: '100%' }}>
        <Grid container justify='space-between' direction='row'>
          <Grid item>
            <FilledButton
              className={classes.button}
              name='Send'
              variant='gray'
              onClick={() => {
                onSend()
              }}
              startIcon={<SendIcon></SendIcon>}></FilledButton>
          </Grid>
          <Grid item>
            <FilledButton
              className={classes.button}
              name='Buy'
              variant='gray'
              disabled
              // onClick={() => {
              //   setOpen(true)
              // }}
              startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}></FilledButton>
          </Grid>
          <Grid item>
            <FilledButton
              className={classes.button}
              name='Swap'
              variant='gray'
              disabled
              // onClick={() => {
              //   setOpen(true)
              // }}
              startIcon={<SwapHorizIcon></SwapHorizIcon>}></FilledButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Main
