import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 40px',
    paddingBottom: 0
  },
  title: {
    fontSize: 26
  },

  button: {
    borderRadius: 5,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    transition: 'all 500ms ease',
    padding: '2px 6px',
    color: colors.white.main
  }
}))

export default useStyles
