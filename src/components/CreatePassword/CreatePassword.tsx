import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid, OutlinedInput, Typography } from '@material-ui/core'
import useStyles from './style'
interface IProps {
  onClick: () => void
  setPassword: (password: string) => void
  password: string
}
export const CreatePassword: React.FC<IProps> = ({ onClick, password, setPassword }) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <Typography variant='h3'>Create Password</Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password' className={classes.label}>
            Password
          </InputLabel>
          <OutlinedInput
            className={classes.input}
            color='primary'
            id='outlined-adornment-password'
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
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={85}
          />
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password' className={classes.label}>
            Confirm Password
          </InputLabel>
          <OutlinedInput
            className={classes.input}
            color='primary'
            id='outlined-adornment-password'
            type={show2 ? 'text' : 'password'}
            value={passwordConfirm}
            onChange={e => {
              setPasswordConfirm(e.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  className={classes.showButton}
                  aria-label='toggle password visibility'
                  onClick={() => {
                    setShow2(!show2)
                  }}
                  edge='end'>
                  {show2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={165}
          />
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <CommonButton
          name='confirm'
          disabled={password.length < 2 || password != passwordConfirm}
          onClick={() => {
            onClick()
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CreatePassword
