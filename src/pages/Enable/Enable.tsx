import React from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address } from '@selectors/solanaWallet'
import { IData } from '../Root/Root'
import CommonButton from '@components/CommonButton/CommonButton'

interface IEnable {
  data: IData
}

export const Enable: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  // Hook auto enable
  // React.useEffect(() => {
  //   if (data.type === ACTION_TYPE.ENABLE && !!userAddress) {
  //     chrome.runtime.sendMessage({
  //       ...data,
  //       userAddress: userAddress,
  //       type: ACTION_TYPE.ENABLE_DONE
  //     })
  //     window.close()
  //   }
  // }, [dispatch, userAddress])
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant='h3'> Enable Extension</Typography>
      </Grid>
      <Grid item>
        <CommonButton
          name='Confirm'
          onClick={async () => {
            if (data.type === ACTION_TYPE.ENABLE && !!userAddress) {
              chrome.runtime.sendMessage({
                ...data,
                userAddress: userAddress,
                type: ACTION_TYPE.ENABLE_DONE
              })
              window.close()
            }
          }}></CommonButton>
      </Grid>
    </Grid>
  )
}
export default Enable
