import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import Divider from '@components/Divider/Divider'
import FilledButton from '@components/FilledButton/FilledButton'
import { PublicKey } from '@solana/web3.js'
import AddIcon from '@material-ui/icons/Add'
import Asset from '@components/Asset/Asset'
import { ITokenAccount } from '@reducers/solanaWallet'
import { printBN } from '@static/utils'
interface IProps {
  tokens?: ITokenAccount[]
  onAddAccount: () => void
  onTokenClick: (address: PublicKey) => void
}
export const AssetsList: React.FC<IProps> = ({ tokens, onAddAccount, onTokenClick }) => {
  const classes = useStyles()
  return (
    <Grid container direction='column' className={classes.root}>
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
    </Grid>
  )
}
export default AssetsList
