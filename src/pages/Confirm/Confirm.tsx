import React from 'react'
import useStyles from './style'
import { Grid } from '@material-ui/core'
import { ACTION_TYPE } from '@static/index'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction } from '@solana/web3.js'
import { IData } from '../Root/Root'

interface IEnable {
  data: IData
}
export const Confirm: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      className={classes.root}
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
      }}>
      <div style={{ height: 300, width: 300, backgroundColor: 'blue', fontSize: 35 }}>
        SIGN TRANSACTION
      </div>
    </Grid>
  )
}
export default Confirm
