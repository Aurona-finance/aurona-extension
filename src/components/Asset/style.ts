import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '6px 0px'
  },
  usdBalance: {
    color: colors.gray['#747474']
  },
  balanceName: {
    width: 170,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  }
}))

export default useStyles
