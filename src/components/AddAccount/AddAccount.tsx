/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
import PlainInput from '@components/PlainInput/PlainInput'

interface IProps {
  onConfirm: (string: PublicKey) => void | Promise<void>
  onCancel: () => void | Promise<void>
}

export const AddAccount: React.FC<IProps> = ({ onConfirm, onCancel }) => {
  const classes = useStyles()
  const [address, setAddress] = useState<string>('')
  const [error, setError] = useState<string | null>()
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    try {
      if (!touched) {
        setTouched(true)
        return
      }
      // eslint-disable-next-line no-new
      new PublicKey(address)
      setError(null)
    } catch (error) {
      setError('Invalid address')
    }
  }, [address])
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h1' className={classes.title}>
          Enter token address
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30, minHeight: 80 }}>
        <PlainInput
          label='Token address*'
          value={address}
          setValue={setAddress}
          error={error}></PlainInput>
      </Grid>
      <Grid item style={{ marginTop: 50, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Go back'
              variant='gray'
              onClick={() => {
                onCancel()
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              disabled={error !== null}
              name='Create'
              onClick={() => {
                onConfirm(new PublicKey(address))
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default AddAccount
