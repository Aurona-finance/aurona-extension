import React, { useState } from 'react'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid, TextField } from '@material-ui/core'
interface IProps {
  onClick: (seed: string) => void
}
export const ImportSeed: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles()
  const [seed, setSeed] = useState('')
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <TextField
          id='standard-adornment-password'
          type='text'
          multiline
          rows={4}
          variant='outlined'
          style={{ borderColor: 'green', color: 'green' }}
          placeholder='Seed'
          value={seed}
          onChange={e => {
            setSeed(e.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <CommonButton
          name='confirm'
          onClick={() => {
            onClick(seed)
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ImportSeed
