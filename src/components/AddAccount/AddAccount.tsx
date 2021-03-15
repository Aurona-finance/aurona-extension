/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import FilledButton from '@components/FilledButton/FilledButton'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
import PlainInput from '@components/PlainInput/PlainInput'
import { TokenInfo } from '@solana/spl-token-registry'
import TokenAdd from '@components/TokenAdd/TokenAdd'

interface IProps {
  onConfirm: (string: PublicKey) => void | Promise<void>
  onCancel: () => void | Promise<void>
  tokens?: TokenInfo[]
}

export const AddAccount: React.FC<IProps> = ({ onConfirm, onCancel, tokens = [] }) => {
  const classes = useStyles()
  const [address, setAddress] = useState<string>('')
  const [error, setError] = useState<string | null>()
  const [touched, setTouched] = useState(false)
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([])
  useEffect(() => {
    try {
      if (!touched) {
        setTouched(true)
        return
      }
      // eslint-disable-next-line no-new
      new PublicKey(address)
      setError(null)
    } catch (error) {
      setError('Invalid address')
    }
  }, [address])
  useEffect(() => {
    if (address.length > 0) {
      setFilteredTokens(tokens.filter(t => t.symbol.startsWith(address.toLocaleUpperCase())))
    }
  }, [address])
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}>
      <Grid item style={{ width: '100%' }}>
        <FilledButton
          name='Go back'
          variant='gray'
          onClick={() => {
            onCancel()
          }}
        />
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant='h1' className={classes.title}>
          Enter token name or address
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30, minHeight: 80 }}>
        <PlainInput
          label='Token name or address*'
          value={address}
          setValue={setAddress}
          error={error}></PlainInput>
      </Grid>
      {filteredTokens.map(t => {
        return (
          <Grid item style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TokenAdd
              token={t}
              onAdd={() => {
                onConfirm(new PublicKey(t.address))
              }}
            />
          </Grid>
        )
      })}
      <Grid item style={{ marginTop: 50 }}>
        <FilledButton
          disabled={error !== null}
          name='Create'
          onClick={() => {
            onConfirm(new PublicKey(address))
          }}
        />
      </Grid>
    </Grid>
  )
}
export default AddAccount
