import React from 'react'
import { StylesProvider } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@storybook/theming'
import { theme } from '../src/static/theme'
import bg from '../src/static/jpg/bg.jpg'
// import useStyles from './style'

export const withStore = store => storyFn => <Provider store={store}>{storyFn()}</Provider>
export const withBackground = storyFn => (
  <Grid
    style={{
      width: 360,
      height: 600,
      backgroundImage: `url(${bg})`
    }}>
    {storyFn()}
  </Grid>
)
export default {
  withStore,
  withBackground
}
