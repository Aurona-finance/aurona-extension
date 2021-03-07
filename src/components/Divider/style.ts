import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.pink.gradient,
    width: '100%',
    height: 1,
    opacity: 0.3
  }
}))

export default useStyles
