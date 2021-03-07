import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  buttonColor: {
    borderRadius: 10,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    transition: 'all 500ms ease',
    minWidth: 110,
    padding: '9px 18px',
    letterSpacing: 0,
    color: colors.white.main,
    border: '1px solid #FFFFFF',
    background:
      'radial-gradient(97.27% 960.82% at 0% 0%, rgba(255, 161, 240, 0.4) 0%, rgba(134, 60, 255, 0.4) 100%)',
    '&:hover': {
      background: 'none'
    }
  },
  buttonGray: {
    borderRadius: 10,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    transition: 'all 500ms ease',
    minWidth: 110,
    padding: '9px 18px',
    letterSpacing: 0,
    color: colors.white.main,
    border: '1px solid #FFFFFF',
    background:
      'radial-gradient(97.27% 960.82% at 0% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 100%)',
    '&:hover': {
      background: 'none'
    }
  },
  disabled: {
    // opacity: 0.2,
    color: 'rgba(255,255,255,0.2) !important',
    border: '1px solid rgba(255,255,255,0.2)',
    background:
      'radial-gradient(97.27% 960.82% at 0% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
  }
}))

export default useStyles
