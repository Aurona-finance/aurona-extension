import React, { useState } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'

import useStyles from './style'
interface IProps {
  text: string
  label: string
  onChange?: (text: string) => void
}
export const FilledButton: React.FC<IProps> = ({ text, label, onChange = () => {} }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Typography variant='body1' className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          className={classes.input}
          color='primary'
          multiline
          rows={5}
          type='text'
          value={text}
          onChange={e => {
            onChange(e.target.value)
          }}
        />
      </Grid>
    </Grid>
  )
}
export default FilledButton
