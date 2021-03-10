import React from 'react'
import { CardMedia } from '@material-ui/core'
import Horizontal from '@static/aurona/horizontal.png'
import useStyles from './style'

export const LogoHorizontal: React.FC = () => {
  const classes = useStyles()
  return <CardMedia style={{ width: 236, height: 78 }} image={Horizontal} />
}
export default LogoHorizontal
