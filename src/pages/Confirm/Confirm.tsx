import React, { useEffect, useState } from 'react'
import { ACTION_TYPE } from '@static/index'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { IData } from '../Root/Root'
import SignTransaction from '@components/SignTransaction/SignTransaction'
import { network } from '@selectors/solanaConnection'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@components/Header/Header'
import useStyles from './style'
import { decodeTransaction, IDecodedTransaction } from '@static/transactionDecoder'
import { LedgerWalletProvider } from '@web3/hardware/walletProvider/ledger'
import { retrieveCurrentAccount } from '@static/utils'
import { actions } from '@reducers/snackbars'
import { actions as uiActions } from '@reducers/ui'

interface IEnable {
  data: IData
}
// TODO fix double parsing
export const Confirm: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  const currentNetwork = useSelector(network)
  const dispatch = useDispatch()
  const [instructions, setInstructions] = useState<IDecodedTransaction[]>([])
  // console.log(Transaction.from(JSON.parse(data.data.transaction).data))
  useEffect(() => {
    const parseInstructions = async () => {
      if (data.data.transaction) {
        const tx = Transaction.from(JSON.parse(data.data.transaction).data).instructions
        const decoded = await Promise.all(
          tx.map(ix => {
            return decodeTransaction(ix)
          })
        )
        setInstructions(decoded)
      } else {
        const txs = JSON.parse(data.data.transactions).map((tx: any) => {
          return Transaction.from(tx.data)
        }) as Transaction[]
        const ixs = txs.reduce((acc, ix) => {
          return acc.concat(ix.instructions)
        }, [] as TransactionInstruction[])
        const decoded = await Promise.all(
          ixs.map(ix => {
            return decodeTransaction(ix)
          })
        )
        setInstructions(decoded)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    parseInstructions()
  }, [])

  return (
    <>
      <Header network={currentNetwork} disableActions onNetworkChange={() => {}}></Header>
      <SignTransaction
        onConfirm={async () => {
          dispatch(uiActions.setLoader({ open: true, message: 'Signing transaction...' }))
          const wallet = await retrieveCurrentAccount()
          if (wallet.type === 'ledger') {
            try {
              const hw = new LedgerWalletProvider()
              await hw.init()
              if (data.data.transaction) {
                const transaction = Transaction.from(JSON.parse(data.data.transaction).data)
                await hw.signTransaction(transaction)

                chrome.runtime.sendMessage({
                  ...data,
                  data: JSON.stringify(transaction.serialize()),
                  type: ACTION_TYPE.REQUEST_RESOLVED
                })
                window.close()
              }
              if (data.data.transactions) {
                const transactions = JSON.parse(data.data.transactions).map((tx: any) => {
                  return Transaction.from(tx.data)
                })
                for (const t of transactions) {
                  await hw.signTransaction(t)
                }
                const rawTx = JSON.stringify(transactions.map((tx: any) => tx.serialize()))
                chrome.runtime.sendMessage({
                  ...data,
                  data: rawTx,
                  type: ACTION_TYPE.REQUEST_RESOLVED
                })
                window.close()
              }
            } catch (error) {
              dispatch(uiActions.setLoader({ open: false, message: '' }))

              dispatch(
                actions.add({
                  message: 'Make sure ledger is connected.',
                  variant: 'error',
                  persist: false
                })
              )
            }
          } else {
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
          }
        }}
        onReject={async () => {
          chrome.runtime.sendMessage({
            ...data,
            data: null,
            type: ACTION_TYPE.REQUEST_RESOLVED
          })
          window.close()
        }}
        transactions={instructions}
        website={data.data.host}></SignTransaction>
    </>
  )
}
export default Confirm
