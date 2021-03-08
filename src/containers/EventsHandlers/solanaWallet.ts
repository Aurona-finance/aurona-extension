import React, { useState } from 'react'
import * as R from 'remeda'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, address, status as walletStatus } from '@selectors/solanaWallet'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaWallet'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@web3/solana/connection'
import { Status } from '@reducers/solanaConnection'
import BN from 'bn.js'
import { parseTokenAccountData } from '@web3/solana/data'

const SolanaWalletEvents = () => {
  const dispatch = useDispatch()
  const publicKey = useSelector(address)
  const networkStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  // Solana Main Wallet
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!publicKey || !connection || networkStatus !== Status.Initalized) {
      return
    }
    const id = connection.onAccountChange(
      new PublicKey(publicKey),
      (accountInfo: AccountInfo<Buffer>) => {
        dispatch(actions.setBalance(new BN(accountInfo.lamports)))
        console.log(accountInfo)
        // console.log(accountInfo)
      }
    )
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      connection.removeAccountChangeListener(id)
    }
  }, [dispatch, publicKey, networkStatus, currentNetwork])

  // Solana Tokens

  // TODO refactor
  const tokensAccounts = useSelector(accounts)
  const walletStat = useSelector(walletStatus)
  const [initializedAccounts, setInitializedAccounts] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!connection || walletStat !== Status.Initalized || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      const tempSet = new Set<string>()
      R.forEachObj(tokensAccounts, tokenAccounts => {
        for (const account of tokenAccounts) {
          tempSet.add(account.address.toString())
          if (initializedAccounts.has(account.address.toString())) {
            continue
          }
          connection.onAccountChange(account.address, (accountInfo: AccountInfo<Buffer>) => {
            const parsedData = parseTokenAccountData(accountInfo.data)
            dispatch(
              actions.setTokenBalance({
                address: account.address,
                programId: parsedData.token,
                balance: new BN(parsedData.amount)
              })
            )
          })
        }
      })
      setInitializedAccounts(tempSet)
    }
    connectEvents()
  }, [dispatch, tokensAccounts, networkStatus, walletStat])

  return null
}

export default SolanaWalletEvents
