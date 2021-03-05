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
export const Create: React.FC = () => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  return (
    <div style={{ height: 300, width: 300, backgroundColor: 'blue', fontSize: 35 }}>
      <FormControl>
        <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
        <Input
          id='standard-adornment-password'
          type={show ? 'text' : 'password'}
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
      <CommonButton
        name='confirm'
        onClick={async () => {
          const acc = new Account()
          const nonce = (await getDataExtensionStorage('nonce')) as string
          await storeAccount('coldAccount', acc, password)
          await storeAccount('hotAccount', acc, nonce)
          dispatch(actions.setStatus(Status.Initalized))
        }}
      />
    </div>
  )
}
export default Create
