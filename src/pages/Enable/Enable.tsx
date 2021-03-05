import React from 'react'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { address } from '@selectors/solanaWallet'
import { IData } from '../Root/Root'
import CommonButton from '@components/CommonButton/CommonButton'
import { getSolanaWallet } from '@web3/solana/wallet'

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
    <Grid
      container
      className={classes.root}
      justify='center'
      alignItems='center'
      direction='column'>
      <Grid item>
        <Typography variant='h3'> Enable Extension</Typography>
      </Grid>
      <Grid item style={{ marginTop: 20, height: 200 }}>
        <Grid container>
          <Grid item>
            <CommonButton
              name='Confirm'
              onClick={async () => {
                const wallet = await getSolanaWallet()
                chrome.runtime.sendMessage({
                  ...data,
                  data: 'enabled',
                  userAddress: wallet.publicKey.toString(),
                  type: ACTION_TYPE.ENABLE_DONE
                })
                window.close()
              }}></CommonButton>
          </Grid>
          <Grid item style={{ marginLeft: 20 }}>
            <CommonButton
              name='Reject'
              onClick={async () => {
                chrome.runtime.sendMessage({
                  ...data,
                  data: null,
                  userAddress: userAddress,
                  type: ACTION_TYPE.ENABLE_DONE
                })
                window.close()
              }}></CommonButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Enable
