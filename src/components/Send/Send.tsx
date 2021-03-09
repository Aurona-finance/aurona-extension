/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import { PublicKey } from '@solana/web3.js'
import { ControllerPlainInput } from '@components/PlainInput/PlainInput'
import BN from 'bn.js'
import { printBNtoBN } from '@static/utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { useForm } from 'react-hook-form'

import useStyles from './style'

interface IProps {
  ticker?: string
  tokenAddress: PublicKey
  balance: BN
  decimals?: number
  onSend: (amount: BN, recipient: PublicKey) => void
  onCancel: () => void | Promise<void>
}
export interface FormFields {
  amount: string
  recipient: string
}
export const AddAccount: React.FC<IProps> = ({
  onSend,
  onCancel,
  decimals = 9,
  balance,
  tokenAddress,
  ticker
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    recipient: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        if (!data) {
          return false
        }
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide recipient.'),
    amount: yup.string().test('test-balance', 'Invalid Amount', amount => {
      try {
        if (!amount) {
          return false
        }
        if (
          printBNtoBN(amount, decimals).gt(balance) ||
          printBNtoBN(amount, decimals).lte(new BN(0))
        ) {
          return false
        } else {
          return true
        }
      } catch (error) {
        return false
      }
    })
  })
  const { control, errors, reset, setValue, handleSubmit, formState } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { amount: '', recipient: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(printBNtoBN(data.amount, decimals), new PublicKey(data.recipient))
    reset()
  }
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h1' className={classes.title}>
          Enter transfer data
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h3' className={classes.title}>
          Send {ticker || tokenAddress.toString()}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30, minHeight: 80 }}>
        <ControllerPlainInput
          control={control}
          label='Recipient'
          name='recipient'
          error={errors?.recipient?.message}
        />
      </Grid>
      <Grid item style={{ marginTop: 30, minHeight: 80 }}>
        <ControllerPlainInput
          control={control}
          label='Amount'
          name='amount'
          error={errors?.amount?.message}
        />
      </Grid>
      <Grid item style={{ marginTop: 50, width: '100%' }}>
        <Grid container justify='space-between'>
          <Grid item>
            <FilledButton
              name='Go back'
              variant='gray'
              onClick={() => {
                onCancel()
              }}
            />
          </Grid>
          <Grid item>
            <FilledButton
              disabled={!formState.isValid}
              name='Send'
              onClick={() => {
                handleSubmit(clearAndSubmit)()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default AddAccount
