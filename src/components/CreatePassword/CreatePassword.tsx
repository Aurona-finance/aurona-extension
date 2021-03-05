import React, { useState } from 'react'
import useStyles from './style'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid } from '@material-ui/core'
interface IProps {
  onClick: () => void
  setPassword: (password: string) => void
  password: string
}
export const CreatePassword: React.FC<IProps> = ({ onClick, password, setPassword }) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
          <Input
            id='standard-adornment-password'
            type={show ? 'text' : 'password'}
            style={{ background: 'white', color: 'red' }}
            placeholder='Password'
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => {
                    setShow(!show)
                  }}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <CommonButton
          name='confirm'
          onClick={() => {
            onClick()
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CreatePassword
