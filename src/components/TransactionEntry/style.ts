import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: colors.white.main,
    marginBottom: 5
  },
  marker: {
    marginRight: 20,
    height: 14,
    width: 14,
    background: colors.pink.gradient,
    borderRadius: '50%'
  },

  subtext: {
    color: colors.gray['#747474'],
    wordBreak: 'break-word'
  }
}))

export default useStyles
