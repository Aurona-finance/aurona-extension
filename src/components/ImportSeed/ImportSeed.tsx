import React, { useState } from 'react'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'
import { mnemonicToSeed } from '@static/seedOperations'
import MultilineText from '@components/MultilineText/MultilineText'
import FilledButton from '@components/FilledButton/FilledButton'
import LogoHorizontal from '@components/LogoHorizontal/LogoHorizontal'
interface IProps {
  onClick: (seed: string) => void
}
export const ImportSeed: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles()
  const [seed, setSeed] = useState('')
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid style={{ marginTop: 40 }}>
        <LogoHorizontal />
      </Grid>
      <Grid item style={{ marginTop: 50 }}>
        <Typography variant='body2' className={classes.welcome}>
          Welcome
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <Typography variant='h1' className={classes.title}>
          Enter seed
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <MultilineText onChange={setSeed} text={seed} label='Your seed*'></MultilineText>
      </Grid>
      <Grid item style={{ marginTop: 42 }}>
        <FilledButton
          name='Import  account'
          onClick={() => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              mnemonicToSeed(seed)
              onClick(seed)
            } catch (error) {
              console.log('invalid seed')
            }
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ImportSeed
