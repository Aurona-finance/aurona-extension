import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { generateMnemonicAndSeed, getAccountFromSeed } from '@static/seedOperations'
import { Account } from '@solana/web3.js'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
import MultilineText from '@components/MultilineText/MultilineText'

interface IProps {
  onClick: (acc: Account) => void
}

export const CreateAccount: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles()
  const [seed, setSeed] = useState<{ mnemonic: string; seed: string }>({ mnemonic: '', seed: '' })
  useEffect(() => {
    const generateAccount = async () => {
      const a = await generateMnemonicAndSeed()
      setSeed(a)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generateAccount()
  }, [])
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 15 }}>
        <Typography variant='h1' className={classes.title}>
          Set protection phase
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <Grid container>
          <Grid item>
            <div className={classes.marker}></div>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item>
                <Typography variant='body1' className={classes.label}>
                  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                  officia consequat duis enim velit mollit. '
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <MultilineText text={seed.mnemonic} label='Your seed*'></MultilineText>
      </Grid>
      <Grid item style={{ marginTop: 42, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Export SEED'
              onClick={() => {
                const acc = getAccountFromSeed(seed.seed)
                onClick(acc)
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              name='Continue'
              onClick={() => {
                const acc = getAccountFromSeed(seed.seed)
                onClick(acc)
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CreateAccount
