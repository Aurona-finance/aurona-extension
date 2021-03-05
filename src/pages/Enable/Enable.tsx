import React from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address } from '@selectors/solanaWallet'
import { IData } from '../Root/Root'

interface IEnable {
  data: IData
}

export const Enable: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  React.useEffect(() => {
    if (data.type === ACTION_TYPE.ENABLE && !!userAddress) {
      chrome.runtime.sendMessage({
        ...data,
        userAddress: userAddress,
        type: ACTION_TYPE.ENABLE_DONE
      })
      window.close()
    }
  }, [dispatch, userAddress])
  return (
    <Grid container className={classes.root}>
      <div style={{ height: 300, width: 300, backgroundColor: 'blue' }}>SIGN TRANSACTION</div>
    </Grid>
  )
}
export default Enable
