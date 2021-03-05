import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  input: {
    color: colors.green.main,
    '& fieldset': {
      borderColor: 'green',
      color: 'blue'
    }
  }
}))

export default useStyles
