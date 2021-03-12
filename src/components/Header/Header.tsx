import React, { useState } from 'react'
import { Grid, Typography, IconButton, Drawer, CardMedia } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import { networkToName, SolanaNetworks } from '@static/index'
import LanguageIcon from '@material-ui/icons/Language'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListEntry from '@components/ListEntry/ListEntry'
import FlightIcon from '@material-ui/icons/Flight'
import AuronaIcon from '@static/aurona/icon.png'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
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
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justify='space-between'
      className={classes.root}>
      {openMenu && (
        <div className={classes.menu}>
          <Grid container direction='column'>
            <Grid item>
              <Typography variant='body1'>Accounts</Typography>
            </Grid>
            {accounts.map(a => {
              return (
                <>
                  <Grid item>
                    <Typography variant='body1'>{a.type}</Typography>
                  </Grid>
                  <Grid
                    item
                    style={{ backgroundColor: a.selected ? 'blue' : 'none' }}
                    onClick={() => {
                      onWalletChange(a.publicKey)
                    }}>
                    <Typography variant='body1'>{a.publicKey.toString()}</Typography>
                  </Grid>
                </>
              )
            })}
            {!existLedger && (
              <Grid item>
                <FilledButton name='Add ledger account' onClick={onNewLedgerAccount} />
              </Grid>
            )}
          </Grid>
        </div>
      )}
      <Grid item className={classes.logo}>
        <CardMedia style={{ width: 36, height: 36 }} image={AuronaIcon} />
      </Grid>
      <Grid item>
        <Grid container>
          {network !== SolanaNetworks.MAIN && !disableActions && (
            <Grid item>
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
          <Grid item>
            <IconButton
              aria-label='delete'
              className={classes.moreButton}
              onClick={() => {
                if (!disableActions) {
                  setOpenMenu(!openMenu)
                }
              }}>
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
    </Grid>
  )
}
export default Header
