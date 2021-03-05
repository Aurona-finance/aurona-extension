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
import { Account } from '@solana/web3.js'
import { getDataExtensionStorage, storeAccount } from '@static/utils'
import { actions, Status } from '@reducers/solanaWallet'
import { useDispatch } from 'react-redux'
import { getColdAccount } from '@web3/solana/wallet'
import { Grid, OutlinedInput } from '@material-ui/core'
export const Unlock: React.FC = () => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password"' style={{ color: 'gray' }}>
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password"'
            type={show ? 'text' : 'password'}
            color='primary'
            value={password}
            className={classes.input}
            onChange={e => {
              setPassword(e.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  color='primary'
                  onClick={() => {
                    setShow(!show)
                  }}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={100}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <CommonButton
          name='Unlock'
          onClick={async () => {
            const acc = await getColdAccount(password)
            dispatch(actions.setStatus(Status.Initalized))
          }}
        />
      </Grid>
    </Grid>
  )
}
export default Unlock
