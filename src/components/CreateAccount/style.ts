import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 40
  },
  title: {
    color: colors.white.main
  },
  marker: {
    marginRight: 14,
    height: 12,
    width: 12,
    border: `1px solid ${colors.green.main}`
  },
  label: {
    color: colors.white.main
  }
}))

export default useStyles
