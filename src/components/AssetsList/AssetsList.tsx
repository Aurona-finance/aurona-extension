import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import Divider from '@components/Divider/Divider'
import FilledButton from '@components/FilledButton/FilledButton'
import { PublicKey } from '@solana/web3.js'
import AddIcon from '@material-ui/icons/Add'
import Asset from '@components/Asset/Asset'
import { ITokenAccount } from '@reducers/solanaWallet'
import { printBN } from '@static/utils'
import Loader from '@static/gif/loader.gif'

interface IProps {
  tokens?: ITokenAccount[]
  onAddAccount: () => void
  onTokenClick: (address: PublicKey) => void
  loading?: boolean
}
export const AssetsList: React.FC<IProps> = ({
  tokens,
  onAddAccount,
  onTokenClick,
  loading = false
}) => {
  const classes = useStyles()
  return (
    <Grid container direction='column' alignItems='center' className={classes.root}>
      <Grid item style={{ width: '100%' }}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h2' className={classes.title}>
              Assets
            </Typography>
          </Grid>
          <Grid item>
            <FilledButton
              className={classes.button}
              name='Add account'
              variant='gray'
              onClick={() => {
                onAddAccount()
              }}
              startIcon={<AddIcon></AddIcon>}></FilledButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '100%', marginTop: 24 }}>
        <Divider />
      </Grid>
      {tokens?.map(tokenAccount => {
        return (
          <>
            <Grid item>
              <Asset
                balance={printBN(tokenAccount.balance, tokenAccount.decimals)}
                name={tokenAccount.ticker || tokenAccount.programId.toString()}
                onClick={() => {
                  onTokenClick(tokenAccount.programId)
                }}
              />
            </Grid>
            <Divider />
          </>
        )
      })}
      {loading && (
        <Grid item style={{ width: 130 }}>
          <CardMedia component='img' height='40%' image={Loader} title='Loading' />
        </Grid>
      )}
    </Grid>
  )
}
export default AssetsList
