import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import { TokenInfo } from '@solana/spl-token-registry'
import FilledButton from '@components/FilledButton/FilledButton'
import AddIcon from '@material-ui/icons/Add'
import TokenLogo from '@components/TokenLogo/TokenLogo'
interface IProps {
  token: TokenInfo
  onAdd: () => void
}
export const TokenAdd: React.FC<IProps> = ({ token, onAdd }) => {
  const classes = useStyles()
  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item>
        <TokenLogo url={token.logoURI} />
      </Grid>
      <Grid item>
        <Typography variant='h2' className={classes.tokenName}>
          {token.name}
        </Typography>
      </Grid>
      <Grid>
        <FilledButton
          name='Add'
          variant='color'
          onClick={onAdd}
          className={classes.button}
          startIcon={<AddIcon />}
        />
      </Grid>
    </Grid>
  )
}
export default TokenAdd
