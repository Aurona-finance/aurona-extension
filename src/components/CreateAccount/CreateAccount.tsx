import React, { useEffect, useState } from 'react'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid, TextField, Typography } from '@material-ui/core'
import { generateMnemonicAndSeed, getAccountFromSeed } from '@static/seedOperations'
import { Account } from '@solana/web3.js'
import useStyles from './style'

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
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <Typography variant='h3'>Save seed</Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <TextField
          id='standard-adornment-password'
          type='text'
          multiline
          rows={4}
          disabled
          variant='outlined'
          style={{ background: 'white', color: 'red' }}
          placeholder='Seed'
          value={seed.mnemonic}
        />
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <CommonButton
          name='confirm'
          onClick={() => {
            const acc = getAccountFromSeed(seed.seed)
            onClick(acc)
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CreateAccount
