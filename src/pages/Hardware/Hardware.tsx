import React from 'react'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
import { LedgerWalletProvider } from '@web3/hardware/walletProvider/ledger'
import { Grid } from '@material-ui/core'
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

export const Hardware: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item>
        <FilledButton
          name='Connect Ledger'
          onClick={async () => {
            const storedAddresses = await getStoredWallets()
            console.log(storedAddresses)
            // chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/popup.html` })
            const hw = new LedgerWalletProvider()
            // console.log(wa)
            await hw.init()
            // console.log(await hw.init())
            console.log(hw.publicKey?.toString())
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
          }}
        />
      </Grid>
    </Grid>
  )
}
export default Hardware
