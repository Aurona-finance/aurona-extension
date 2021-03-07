import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'

import useStyles from './style'
interface IProps {
  text: string
  label: string
  selected?: boolean
}
export const FilledButton: React.FC<IProps> = ({ text, label, selected = false }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <div className={classNames(classes.marker, { [classes.markerSelected]: selected })}></div>
      </Grid>
      <Grid item xs>
        <Grid container>
          <Grid item>
            <Typography
              variant='h3'
              className={classNames(classes.label, { [classes.selectedLabel]: selected })}>
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
