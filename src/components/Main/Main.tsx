import React from 'react'
import { Grid, Typography, IconButton, CardMedia } from '@material-ui/core'
import useStyles from './style'
import eth from '@static/icons/eth.png'
import Divider from '@components/Divider/Divider'
import FilledButton from '@components/FilledButton/FilledButton'
import SendIcon from '@material-ui/icons/Send'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
interface IProps {
  address: string
  balance: string
  balanceUsd?: string
  onSend: () => {}
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
        <Typography variant='body1' className={classes.address}>
          {address}
        </Typography>
      </Grid>
      <Divider />
      <Grid item style={{ marginTop: 12 }}>
        <Grid container>
          <Grid item>
            <Typography variant='h1' className={classes.balance}>{`${balance} SOL`}</Typography>
          </Grid>
          <Grid item>
            <CardMedia style={{ width: 32, height: 32, marginLeft: 20 }} image={eth} />
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
