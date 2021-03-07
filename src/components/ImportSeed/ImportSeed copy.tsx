import React, { useState } from 'react'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid, InputLabel, Typography, OutlinedInput, FormControl } from '@material-ui/core'
import { mnemonicToSeed } from '@static/seedOperations'
interface IProps {
  onClick: (seed: string) => void
}
export const ImportSeed: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles()
  const [seed, setSeed] = useState('')
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <Typography variant='h3'>Enter seed</Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password' className={classes.label}>
            Your seed
          </InputLabel>
          <OutlinedInput
            className={classes.input}
            color='primary'
            id='outlined-adornment-password'
            type='text'
            multiline
            rows={4}
            value={seed}
            onChange={e => {
              setSeed(e.target.value)
            }}
            labelWidth={85}
          />
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <CommonButton
          name='confirm'
          onClick={() => {
            try {
              mnemonicToSeed(seed)
              onClick(seed)
            } catch (error) {}
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ImportSeed
