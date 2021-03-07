import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: colors.white.main,
    marginBottom: 5
  },
  selectedLabel: {
    fontWeight: 'bold',
    background: colors.pink.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  marker: {
    marginRight: 14,
    height: 12,
    width: 12,
    border: `1px solid ${colors.green.main}`
  },
  markerSelected: {
    background: colors.pink.gradient,
    marginRight: 15,
    height: 13,
    width: 13,
    border: `none`
  },
  subtext: {
    textTransform: 'uppercase',
    color: colors.gray['#747474']
  }
}))

export default useStyles
