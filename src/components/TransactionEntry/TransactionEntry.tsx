import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './style'
interface IProps {
  text: string
  label: string
}
export const FilledButton: React.FC<IProps> = ({ text, label }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <div className={classes.marker}></div>
      </Grid>
      <Grid item xs>
        <Grid container>
          <Grid item>
            <Typography variant='h3' className={classes.label}>
              {label}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' className={classes.subtext}>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default FilledButton
