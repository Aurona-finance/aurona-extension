import React from 'react'
import { Grid, OutlinedInput, Typography } from '@material-ui/core'

import useStyles from './style'
interface IProps {
  setValue: (password: string) => void
  value: string
  label: string
  error?: string | null
}
export const PlainInput: React.FC<IProps> = ({ setValue, value, label, error }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Typography variant='body1' className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput
          error={!!error}
          className={classes.input}
          color='primary'
          type={'text'}
          value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
        />
      </Grid>
      {error && (
        <Grid item>
          <Typography variant='body1' className={classes.error}>
            {error}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
export default PlainInput
