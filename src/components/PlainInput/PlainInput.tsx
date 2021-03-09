import React from 'react'
import { Grid, OutlinedInput, Typography } from '@material-ui/core'
import { Controller } from 'react-hook-form'

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
interface IControllerPlainInputProps {
  control: any
  name: string
  label: string
  error?: string | null | undefined
}
export const ControllerPlainInput: React.FC<IControllerPlainInputProps> = ({
  label,
  error,
  name,
  control
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Typography variant='body1' className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={OutlinedInput}
          error={!!error}
          className={classes.input}
          name={name}
          color='primary'
          type={'text'}
          control={control}
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
