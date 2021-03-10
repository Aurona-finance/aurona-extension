import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import FilledButton from '@components/FilledButton/FilledButton'
import TransactionEntry from '@components/TransactionEntry/TransactionEntry'
import Divider from '@components/Divider/Divider'
import { IDecodedTransaction } from '@static/transactionDecoder'

interface IProps {
  website: string
  transactions: IDecodedTransaction[]
  onConfirm: () => void
  onReject: () => void
}

export const SignTransaction: React.FC<IProps> = ({
  website,
  onConfirm,
  onReject,
  transactions
}) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h1' className={classes.title}>
          Sign transactions
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 55, width: '100%' }}>
        <Grid container>
          <Grid item>
            <div className={classes.marker}></div>
          </Grid>
          <Grid item xs>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  <span style={{ fontWeight: 'bold' }}>{website}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' className={classes.label}>
                  wants to:
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 30, width: '100%' }}>
        {transactions.map((transaction: IDecodedTransaction, index) => {
          return (
            <>
              <Divider></Divider>
              <Grid item style={{ marginTop: 16, marginBottom: 10 }}>
                <TransactionEntry
                  label={`${transaction.operation} #${index + 1}`}
                  text={transaction.text}></TransactionEntry>
              </Grid>
            </>
          )
        })}
      </Grid>
      <Grid item style={{ marginTop: 30, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Reject'
              variant='gray'
              onClick={() => {
                onReject()
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              name='Confirm'
              onClick={() => {
                onConfirm()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SignTransaction
