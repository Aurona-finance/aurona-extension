import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 40
  },
  welcome: {
    letterSpacing: '0.1em',
    fontSize: 14,
    fontWeight: 'bold',
    background: colors.pink.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  title: {
    color: colors.white.main
  }
}))

export default useStyles
