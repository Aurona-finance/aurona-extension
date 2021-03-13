/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import useStyles from './style'

interface IProps {
  website: string
  onConfirm: () => void | Promise<void>
  onReject: () => void | Promise<void>
}

export const Enable: React.FC<IProps> = ({ website, onConfirm, onReject }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h1' className={classes.title}>
          Connect request
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 55 }}>
        <Grid container>
          <Grid item>
            <div className={classes.marker}></div>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  <span style={{ fontWeight: 'bold' }}>{website}</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 50, width: '100%' }}>
        <Typography variant='body2' className={classes.label}>
          Website {website} wants to connect to your wallet. It will gain access to your public key
          and will be able to send transaction requests.
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 50, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Reject'
              variant='gray'
              onClick={() => {
                onReject()
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              name='Confirm'
              onClick={() => {
                onConfirm()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Enable
