import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 40
  },
  title: {
    color: colors.white.main,
    wordBreak: 'break-all'
  },
  label: {
    color: colors.white.main
  }
}))

export default useStyles
