import React from 'react'
import useStyles from './style'

export const Divider: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.root}></div>
}
export default Divider
