import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { generateMnemonicAndSeed } from '@static/seedOperations'
import FilledButton from '@components/FilledButton/FilledButton'
import MultilineText from '@components/MultilineText/MultilineText'
import { saveAs } from 'file-saver'
import useStyles from './style'
interface IProps {
  onClick: (acc: string) => void
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
                  These 24 words will allow you to restore your Aurona account. Keep them in safe
                  location and don't share them with anyone.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <MultilineText text={seed.mnemonic} label='Your seed*'></MultilineText>
      </Grid>
      <Grid item style={{ marginTop: 50, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Export JSON'
              onClick={() => {
                const fileToSave = new Blob([JSON.stringify(seed.mnemonic)], {
                  type: 'application/json'
                })
                saveAs(fileToSave, 'AuronaExtensionMnemonic')
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              name='Continue'
              onClick={() => {
                onClick(seed.seed)
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CreateAccount
