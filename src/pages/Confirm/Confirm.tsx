import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'
import { IData } from '../Root/Root'
import CommonButton from '@components/CommonButton/CommonButton'

interface IEnable {
  data: IData
}
export const Confirm: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      alignItems='center'
      direction='column'>
      <Grid item>
        <Typography variant='h3'> SIGN TRANSACTION</Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <Grid container>
          <Grid item>
            <CommonButton
              name='Confirm'
              onClick={async () => {
                if (data.data.transaction) {
                  const wallet = await getSolanaWallet()
                  const transaction = Transaction.from(JSON.parse(data.data.transaction).data)
                  transaction.partialSign(wallet)

                  chrome.runtime.sendMessage({
                    ...data,
                    data: JSON.stringify(transaction.serialize()),
                    type: ACTION_TYPE.REQUEST_RESOLVED
                  })
                  window.close()
                }
                if (data.data.transactions) {
                  const wallet = await getSolanaWallet()
                  let transactions = JSON.parse(data.data.transactions).map((tx: any) => {
                    return Transaction.from(tx.data)
                  })
                  transactions = transactions.map((t: any) => {
                    t.partialSign(wallet)
                    return t
                  })
                  const rawTx = JSON.stringify(transactions.map((tx: any) => tx.serialize()))
                  chrome.runtime.sendMessage({
                    ...data,
                    data: rawTx,
                    type: ACTION_TYPE.REQUEST_RESOLVED
                  })
                  window.close()
                }
              }}></CommonButton>
          </Grid>
          <Grid item style={{ marginLeft: 20 }}>
            <CommonButton
              name='reject'
              onClick={async () => {
                chrome.runtime.sendMessage({
                  ...data,
                  data: null,
                  type: ACTION_TYPE.REQUEST_RESOLVED
                })
                window.close()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Confirm
