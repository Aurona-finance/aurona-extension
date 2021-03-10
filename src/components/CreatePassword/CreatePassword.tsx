import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import PasswordInput from '@components/PasswordInput/PasswordInput'
import FilledButton from '@components/FilledButton/FilledButton'
import LogoHorizontal from '@components/LogoHorizontal/LogoHorizontal'
interface IProps {
  onClick: () => void
  setPassword: (password: string) => void
  password: string
}
export const CreatePassword: React.FC<IProps> = ({ onClick, password, setPassword }) => {
  const classes = useStyles()
  const [passwordConfirm, setPasswordConfirm] = useState('')
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid style={{ marginTop: 40 }}>
        <LogoHorizontal />
      </Grid>
      <Grid item style={{ marginTop: 50 }}>
        <Typography variant='body2' className={classes.welcome}>
          Welcome
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <Typography variant='h1' className={classes.title}>
          Create Password
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          label='Password*'></PasswordInput>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <PasswordInput
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
          label='Repeat password*'></PasswordInput>
      </Grid>
      <Grid item style={{ marginTop: 50 }}>
        <FilledButton
          name='Create account'
          disabled={password.length < 2 || password !== passwordConfirm}
          onClick={() => {
            onClick()
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CreatePassword
