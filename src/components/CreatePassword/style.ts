import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 350,
    height: 600
  },
  input: {
    color: colors.green.main,
    '& fieldset': {
      borderColor: colors.green.main,
      color: colors.green.main
    }
  },
  label: {
    color: colors.green.main
  },
  showButton: {
    color: colors.green.main
  }
}))

export default useStyles
