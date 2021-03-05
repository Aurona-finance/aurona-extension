import React from 'react'
import useStyles from './style'
import { Grid } from '@material-ui/core'
import CommonButton from '@components/CommonButton/CommonButton'
interface IProps {
  onFromSeed: () => void
  onNew: () => void
}
export const SelectCreateAccount: React.FC<IProps> = ({ onFromSeed, onNew }) => {
  const classes = useStyles()
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <CommonButton
          name='Create from Seed'
          onClick={() => {
            onFromSeed()
          }}
        />
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <CommonButton
          name='New Account'
          onClick={() => {
            onNew()
          }}
        />
      </Grid>
    </Grid>
  )
}
export default SelectCreateAccount
