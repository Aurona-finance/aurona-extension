import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '100%',
    fontSize: 14,
    lineHeight: 17,
    // color: colors.green.main,
    '& .MuiOutlinedInput-input': {
      padding: '14px 24px'
    },
    '& fieldset': {
      borderColor: colors.gray['#747474'],
      // color: colors.green.main,
      borderRadius: 10,
      backgroundColor: colors.gray.backgroundOpacity
    }
  },
  label: {
    color: colors.white.main,
    marginBottom: 5
  },
  showButton: {
    // height: 24,
    // width: 24
    color: colors.white.main
  },
  icon: {
    minHeight: 24,
    minWidth: 24
  }
}))

export default useStyles
