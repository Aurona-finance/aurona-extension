import BN from 'bn.js'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@static/index'
import * as R from 'remeda'
import { ISolanaWallet, ITokenAccount, solanaWalletSliceName } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status, transactions } = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status',
  'transactions'
])

export const tokensAggregated = createSelector(accounts, tokensAccounts => {
  return R.mapValues(tokensAccounts, tokenAccounts => {
    return {
      balance: tokenAccounts.reduce((acc, account) => acc.add(account.balance), new BN(0)),
      accounts: tokenAccounts
    }
  })
})

export const tokenBalance = (tokenAddress: PublicKey) =>
  createSelector(accounts, balance, (tokensAccounts, solBalance) => {
    if (tokenAddress.equals(DEFAULT_PUBLICKEY)) {
      return { balance: solBalance, decimals: 9 }
    } else {
      if (!tokensAccounts[tokenAddress.toString()]) {
        return { balance: new BN(0), decimals: 9 }
      }
      return {
        balance: tokensAccounts[tokenAddress.toString()][0].balance,
        decimals: tokensAccounts[tokenAddress.toString()][0].decimals
      }
    }
  })

export const accountsArray = createSelector(accounts, tokensAccounts => {
  return Object.values(tokensAccounts).reduce((acc, accounts) => {
    return acc.concat(accounts)
  }, [])
})
export const accountsWithSol = createSelector(
  accounts,
  balance,
  address,
  (tokensAccounts, solBalance, solAddress): ITokenAccount[] => {
    const accs = Object.values(tokensAccounts).reduce((acc, accounts) => {
      return acc.concat(accounts)
    }, [] as ITokenAccount[])
    if (!solAddress) {
      return accs
    }
    accs.push({
      address: new PublicKey(solAddress),
      balance: solBalance,
      decimals: 9,
      programId: DEFAULT_PUBLICKEY,
      ticker: 'SOL'
    })
    return accs
  }
)

export const tokenAccount = (tokenAddress: PublicKey) =>
  createSelector(accounts, address, balance, (tokensAccounts, solAddress, solBalance) => {
    if (tokensAccounts[tokenAddress.toString()]) {
      return tokensAccounts[tokenAddress.toString()][0]
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        programId: DEFAULT_PUBLICKEY,
        address: new PublicKey(solAddress),
        balance: solBalance,
        decimals: 9,
        ticker: 'SOL'
      } as ITokenAccount
    }
  })

export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokensAggregated,
  transactions,
  accountsWithSol
}
export default solanaWalletSelectors
