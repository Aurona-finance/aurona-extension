import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '6px 0px'
  },
  tokenName: {
    textAlign: 'center',
    fontSize: 16,
    width: 155,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  button: {
    borderRadius: 5,
    color: colors.white.main,
    height: 30,
    minWidth: 70
  }
}))

export default useStyles
