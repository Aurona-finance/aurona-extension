import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px 40px',
    paddingBottom: 0
  },
  usdBalance: {
    marginTop: 5,
    color: colors.gray['#747474'],
    marginBottom: 12,
    fontSize: 14
  },
  title: {
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: colors.gray['#747474']
  },
  address: {
    marginTop: 5,
    marginBottom: 12,
    width: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  balance: {
    fontSize: 28
  },
  button: {
    borderRadius: 5,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    transition: 'all 500ms ease',
    maxWidth: 80,
    minWidth: 80,
    padding: '4px 6px',
    color: colors.white.main
    // border: '1px solid #FFFFFF'
    // background:
    //   'radial-gradient(97.27% 960.82% at 0% 0%, rgba(255, 161, 240, 0.4) 0%, rgba(134, 60, 255, 0.4) 100%)',
    // '&:hover': {
    //   background: 'none'
    // }
  }
}))

export default useStyles
