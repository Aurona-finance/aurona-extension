import React from 'react'
import useStyles from './style'
import icon from '@static/aurona/icon.png'
interface IProps {
  url?: string
}
export const TokenLogo: React.FC<IProps> = ({ url }) => {
  const classes = useStyles()
  return <img src={url || icon} style={{ width: 35, height: 35, borderRadius: '50%' }}></img>
}
export default TokenLogo
