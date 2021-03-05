import React from 'react'
import useStyles from './style'
import { Grid } from '@material-ui/core'
export const Loading: React.FC = () => {
  const classes = useStyles()
  return (
    <div style={{ height: 300, width: 300, backgroundColor: 'blue', fontSize: 35 }}>
      Loading Account
    </div>
  )
}
export default Loading
