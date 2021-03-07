import React, { useState } from 'react'
import { Grid, Typography, IconButton, Drawer } from '@material-ui/core'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
import { networkToName, SolanaNetworks } from '@static/index'
import LanguageIcon from '@material-ui/icons/Language'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListEntry from '@components/ListEntry/ListEntry'
interface IProps {
  onNetworkChange: (network: SolanaNetworks) => void
  network: SolanaNetworks
  disableActions?: boolean
}
export const SelectCreateAccount: React.FC<IProps> = ({
  onNetworkChange,
  network,
  disableActions = false
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justify='space-between'
      className={classes.root}>
      <Grid item className={classes.logo}></Grid>
      <Grid item>
        <Grid container>
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
export default SelectCreateAccount
