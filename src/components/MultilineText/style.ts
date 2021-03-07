import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '100%',
    '& fieldset': {
      borderColor: colors.gray['#747474'],

      borderRadius: 10,
      minHeight: 140,
      backgroundColor: colors.gray.backgroundOpacity
    },
    '& textarea': {
      fontSize: 14,
      lineHeight: '22px'
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '16px'
    }
  },
  label: {
    color: colors.white.main,
    marginBottom: 5
  }
}))

export default useStyles
