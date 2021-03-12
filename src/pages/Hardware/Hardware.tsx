import React from 'react'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
import { LedgerWalletProvider } from '@web3/hardware/walletProvider/ledger'
import { Grid, Typography } from '@material-ui/core'
import {
  setDataExtensionStorage,
  IEncryptedKey,
  getStoredWallets,
  storeCurrentWallet,
  encrypt,
  getNonce,
  retrieveHotPassword
} from '@static/utils'
import { STORAGE_KEYS } from '@static/index'
import LogoHorizontal from '@components/LogoHorizontal/LogoHorizontal'
import { actions } from '@reducers/snackbars'
import { useDispatch } from 'react-redux'

export const Hardware: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      className={classes.root}>
      <Grid style={{ marginTop: 40 }}>
        <LogoHorizontal />
      </Grid>
      <Grid item style={{ marginTop: 55, width: 250 }}>
        <Grid container>
          <Grid item>
            <div className={classes.marker}></div>
          </Grid>
          <Grid item xs>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  <span style={{ fontWeight: 'bold' }}>Connect</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  Make sure ledger device is connected.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 30, width: 250 }}>
        <Grid container>
          <Grid item>
            <div className={classes.marker}></div>
          </Grid>
          <Grid item xs>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  <span style={{ fontWeight: 'bold' }}>Unlock</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  Unlock device and open Solana app.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 40 }}>
        <FilledButton
          name='Connect Ledger'
          onClick={async () => {
            try {
              const storedAddresses = await getStoredWallets()
              const hw = new LedgerWalletProvider()
              await hw.init()
              if (hw.publicKey?.toString()) {
                const password = await retrieveHotPassword()
                storedAddresses[hw.publicKey.toString()] = {
                  type: 'ledger',
                  publicKey: hw.publicKey.toString(),
                  key: 0,
                  // Create it just to later test on open
                  privkey: encrypt(hw.publicKey.toString(), password)
                }
                // This could overwrite Aurona accounts but we still keep seed
                // in separate storage just in case
                await setDataExtensionStorage(
                  STORAGE_KEYS.ALL_WALLETS,
                  JSON.stringify(storedAddresses)
                )
                await storeCurrentWallet({
                  type: 'ledger',
                  publicKey: hw.publicKey.toString(),
                  key: 0,
                  privkey: encrypt(hw.publicKey.toString(), password)
                })
                window.close()
              }
            } catch (error) {
              console.log(error)
              dispatch(
                actions.add({
                  message: 'Make sure ledger is connected.',
                  variant: 'error',
                  persist: false
                })
              )
            }
          }}
        />
      </Grid>
    </Grid>
  )
}
export default Hardware
