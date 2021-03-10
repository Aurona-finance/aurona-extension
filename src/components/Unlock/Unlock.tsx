import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import PasswordInput from '@components/PasswordInput/PasswordInput'
import FilledButton from '@components/FilledButton/FilledButton'
import LogoHorizontal from '@components/LogoHorizontal/LogoHorizontal'
interface IProps {
  onClick: (password: string) => void
}
export const Unlock: React.FC<IProps> = ({ onClick }) => {
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
          Welcome back
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <Typography variant='h1' className={classes.title}>
          Enter Password
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 55 }}>
        <PasswordInput
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
          label='Repeat password*'></PasswordInput>
      </Grid>
      <Grid item style={{ marginTop: 80 }}>
        <FilledButton
          name='Log in'
          disabled={passwordConfirm.length < 1}
          onClick={() => {
            onClick(passwordConfirm)
          }}
        />
      </Grid>
    </Grid>
  )
}
export default Unlock
