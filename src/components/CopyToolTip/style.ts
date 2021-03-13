import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: colors.white.main,
    marginTop: 12,
    cursor: 'pointer',
    color: colors.black.background,
    fontSize: 12
  },
  arrow: {
    color: colors.white.main
  },
  wrapper: {
    cursor: 'pointer'
  }
}))

export default useStyles
