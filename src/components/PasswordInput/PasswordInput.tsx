import React, { useState } from 'react'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography
} from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import useStyles from './style'
interface IProps {
  setPassword: (password: string) => void
  password: string
  label: string
}
export const PasswordInput: React.FC<IProps> = ({ setPassword, password, label }) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  return (
    <Grid container>
      <Grid item>
        <Typography variant='body1' className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput
          className={classes.input}
          color='primary'
          type={show ? 'text' : 'password'}
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                className={classes.showButton}
                aria-label='toggle password visibility'
                onClick={() => {
                  setShow(!show)
                }}
                edge='end'>
                {show ? (
                  <Visibility className={classes.icon} />
                ) : (
                  <VisibilityOff className={classes.icon} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  )
}
export default PasswordInput
