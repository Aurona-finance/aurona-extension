import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { IWallet } from '@static/utils'

export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initalized = 'initalized'
}
export interface ITokenAccount {
  programId: PublicKey
  balance: BN
  address: PublicKey
  decimals: number
  ticker?: string
}
export interface ITransaction {
  recipient: string
  amount: number
  txid: string
  sending: boolean
  token?: string
  error?: string
}
export interface ISolanaWallet {
  status: Status
  address: string
  balance: BN
  transactions: { [key in string]: ITransaction }
  accounts: { [key in string]: ITokenAccount[] }
  wallets: IWallet[]
  type: 'ledger' | 'aurona'
}

export const defaultState: ISolanaWallet = {
  status: Status.Uninitialized,
  type: 'aurona',
  address: '',
  balance: new BN(0),
  transactions: {},
  accounts: {},
  wallets: []
}
export const solanaWalletSliceName = 'solanaWallet'
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    initWallet(state) {
      return state
    },
    changeWallet(state, _action: PayloadAction<IWallet>) {
      return state
    },
    setWallets(state, action: PayloadAction<IWallet[]>) {
      state.wallets = action.payload
      return state
    },
    setType(state, action: PayloadAction<'ledger' | 'aurona'>) {
      state.type = action.payload
      return state
    },
    createAccount(state, _action: PayloadAction<PublicKey>) {
      return state
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
      return state
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<BN>) {
      state.balance = action.payload
      return state
    },
    addTransaction(state, action: PayloadAction<IaddTransaction>) {
      state.transactions[action.payload.id] = {
        recipient: action.payload.recipient,
        amount: action.payload.amount,
        txid: '',
        sending: true,
        token: action.payload.token
      }
      return state
    },
    setTransactionTxid(state, action: PayloadAction<{ txid: string; id: string }>) {
      state.transactions[action.payload.id].txid = action.payload.txid
      state.transactions[action.payload.id].sending = false
      return state
    },
    setTransactionError(state, action: PayloadAction<{ error: string; id: string }>) {
      state.transactions[action.payload.id].error = action.payload.error
      state.transactions[action.payload.id].sending = false
      return state
    },
    addTokenAccount(state, action: PayloadAction<ITokenAccount>) {
      if (!state.accounts[action.payload.programId.toString()]) {
        state.accounts[action.payload.programId.toString()] = []
      }
      state.accounts[action.payload.programId.toString()].push(action.payload)
      return state
    },
    setTokenBalance(state, action: PayloadAction<IsetTokenBalance>) {
      const index = state.accounts[action.payload.programId.toString()].findIndex(account =>
        account.address.equals(action.payload.address)
      )
      state.accounts[action.payload.programId.toString()][index].balance = action.payload.balance
      return state
    },
    // Triggers rescan for tokens that we control
    rescanTokens() {},
    airdrop() {}
  }
})
interface IsetTokenBalance {
  address: PublicKey
  programId: PublicKey
  balance: BN
}
interface IaddTransaction {
  recipient: string
  amount: number
  id: string
  token?: string
  accountAddress?: string
}
export const actions = solanaWalletSlice.actions
export const reducer = solanaWalletSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
