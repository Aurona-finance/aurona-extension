import React, { useState } from 'react'
import { Grid, Typography, IconButton, Drawer, CardMedia } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import { networkToName, SolanaNetworks } from '@static/index'
import LanguageIcon from '@material-ui/icons/Language'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListEntry from '@components/ListEntry/ListEntry'
import FlightIcon from '@material-ui/icons/Flight'
import AuronaIcon from '@static/aurona/icon.png'
import AvatarIcon from '@static/aurona/avatar.png'
import Divider from '@components/Divider/Divider'
import AddIcon from '@material-ui/icons/Add'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import UsbIcon from '@material-ui/icons/Usb'
import useStyles from './style'
interface IUserAccounts {
  type: 'aurona' | 'ledger'
  publicKey: string
  selected: boolean
}
interface IProps {
  onNetworkChange: (network: SolanaNetworks) => void
  network: SolanaNetworks
  accounts?: IUserAccounts[]
  disableActions?: boolean
  onAirdrop?: () => void
  onNewLedgerAccount?: () => void
  onWalletChange?: (publicKey: string) => void
  existLedger?: boolean
}
export const Header: React.FC<IProps> = ({
  onNetworkChange,
  network,
  accounts = [],
  disableActions = false,
  existLedger = false,
  onAirdrop = () => {},
  onNewLedgerAccount = () => {},
  onWalletChange = () => {}
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openAccounts, setOpenAccounts] = useState(false)
  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justify='space-between'
      className={classes.root}>
      <Grid item className={classes.logo}>
        <CardMedia style={{ width: 36, height: 36 }} image={AuronaIcon} />
      </Grid>
      <Grid item>
        <Grid container justify='center' alignItems='center'>
          {network !== SolanaNetworks.MAIN && !disableActions && (
            <Grid item className={classes.aidropDiv}>
              <FilledButton
                className={classes.airdropButton}
                name={'Airdrop'}
                variant='gray'
                startIcon={<FlightIcon></FlightIcon>}
                onClick={() => {
                  onAirdrop()
                }}></FilledButton>
            </Grid>
          )}
          <Grid item>
            <FilledButton
              className={classes.button}
              name={networkToName(network)}
              variant='gray'
              onClick={() => {
                if (!disableActions) {
                  setOpen(true)
                }
              }}
              startIcon={<LanguageIcon></LanguageIcon>}></FilledButton>
          </Grid>
          <Grid
            item
            className={classes.logoAvatar}
            onClick={() => {
              if (!disableActions) {
                setOpenAccounts(!openAccounts)
              }
            }}>
            <CardMedia
              style={{ width: 25, height: 25, marginTop: 5, marginLeft: 20 }}
              image={AvatarIcon}
            />
          </Grid>
          <Grid item>
            <IconButton aria-label='delete' className={classes.moreButton}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor='bottom'
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        classes={{ paper: classes.drawer }}>
        <Grid container className={classes.drawerRoot} direction='column'>
          <Grid item>
            <Typography variant='h2' className={classes.drawerTitle}>
              Available networks
            </Typography>
          </Grid>
          {Object.entries(SolanaNetworks).map(([k, v]) => {
            return (
              <Grid
                key={v}
                item
                className={classes.drawerEntry}
                onClick={() => {
                  onNetworkChange(v)
                }}>
                <ListEntry
                  label={networkToName(v)}
                  // @ts-expect-error
                  text={SolanaNetworks[k]}
                  // @ts-expect-error
                  selected={SolanaNetworks[k] === network}></ListEntry>
              </Grid>
            )
          })}
        </Grid>
      </Drawer>
      <Drawer
        anchor='bottom'
        open={openAccounts}
        onClose={() => {
          setOpenAccounts(false)
        }}
        classes={{ paper: classes.drawer }}>
        <Grid container className={classes.drawerRoot} direction='column'>
          <Grid item>
            <Typography variant='h2' className={classes.drawerTitle}>
              Available networks
            </Typography>
          </Grid>
          {accounts.map((account, index) => {
            return (
              <Grid
                key={index}
                item
                className={classes.drawerEntry}
                onClick={() => {
                  onWalletChange(account.publicKey)
                }}>
                <ListEntry
                  label={`Account #${index + 1} ${account.type === 'ledger' ? ' (Ledger)' : ''}`}
                  text={account.publicKey}
                  selected={account.selected}
                />
              </Grid>
            )
          })}
          <Grid item className={classes.divider}>
            <Divider></Divider>
          </Grid>
          <Grid item style={{ marginTop: 25 }}>
            <Typography variant='h2' className={classes.drawerTitle}>
              Manage Accounts
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction='column' justify='center' alignItems='center'>
              <Grid item>
                <FilledButton
                  className={classes.buttonAccounts}
                  name='Create account'
                  disabled
                  variant='gray'
                  onClick={() => {
                    // if (!disableActions) {
                    //   setOpen(true)
                    // }
                  }}
                  startIcon={<AddIcon style={{ fontSize: 15 }}></AddIcon>}></FilledButton>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <FilledButton
                  className={classes.buttonAccounts}
                  name='Import account'
                  variant='gray'
                  disabled
                  onClick={() => {
                    // if (!disableActions) {
                    //   setOpen(true)
                    // }
                  }}
                  startIcon={
                    <ArrowDownwardIcon style={{ fontSize: 15 }}></ArrowDownwardIcon>
                  }></FilledButton>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <FilledButton
                  className={classes.buttonAccounts}
                  name='Connect ledger'
                  variant='gray'
                  disabled={existLedger}
                  onClick={() => {
                    if (!disableActions) {
                      onNewLedgerAccount()
                    }
                  }}
                  startIcon={<UsbIcon style={{ fontSize: 15 }}></UsbIcon>}></FilledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
  )
}
export default Header
