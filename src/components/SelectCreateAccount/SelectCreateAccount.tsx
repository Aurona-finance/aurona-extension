import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
interface IProps {
  onFromSeed: () => void
  onNew: () => void
}
export const SelectCreateAccount: React.FC<IProps> = ({ onFromSeed, onNew }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 150 }}>
        <Typography variant='body2' className={classes.welcome}>
          Welcome
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <Typography variant='h1' className={classes.title}>
          Create or import password
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 80, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item style={{ marginLeft: -10 }}>
            <FilledButton
              name='Import from seed'
              onClick={() => {
                onFromSeed()
              }}
            />
          </Grid>
          <Grid item style={{ marginRight: -10 }}>
            <FilledButton
              name='Create new'
              onClick={() => {
                onNew()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SelectCreateAccount
