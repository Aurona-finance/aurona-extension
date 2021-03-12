import React from 'react'

import { useSelector } from 'react-redux'
import { Backdrop, Grid, CardMedia, Typography } from '@material-ui/core'
import { loader } from '@selectors/ui'
import Loader from '@static/gif/loader.gif'

import useStyles from './style'

export const GlobalLoader: React.FC = () => {
  const loaderData = useSelector(loader)
  const classes = useStyles()
  return (
    <Backdrop
      transitionDuration={{ appear: 0, exit: 300 }}
      className={classes.backdrop}
      open={loaderData.open}>
      <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
        <Grid item>
          <CardMedia component='img' height='100%' image={Loader} title='Loading' />
        </Grid>
        {loaderData.message && (
          <Grid>
            <Typography variant='h2'>{loaderData.message}</Typography>
          </Grid>
        )}
      </Grid>
    </Backdrop>
  )
}

export default GlobalLoader
