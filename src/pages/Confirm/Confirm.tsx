import React from 'react'
import { ACTION_TYPE } from '@static/index'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { IData } from '../Root/Root'
import SignTransaction from '@components/SignTransaction/SignTransaction'
import { network } from '@selectors/solanaConnection'
import { useSelector } from 'react-redux'
import Header from '@components/Header/Header'
import useStyles from './style'

interface IEnable {
  data: IData
}
// TODO fix double parsing
export const Confirm: React.FC<IEnable> = ({ data }) => {
  const classes = useStyles()
  const currentNetwork = useSelector(network)
  // console.log(Transaction.from(JSON.parse(data.data.transaction).data))
  let instructions: TransactionInstruction[]
  if (data.data.transaction) {
    instructions = Transaction.from(JSON.parse(data.data.transaction).data).instructions
  } else {
    const transactions = JSON.parse(data.data.transactions).map((tx: any) => {
      return Transaction.from(tx.data)
    }) as Transaction[]
    instructions = transactions.reduce((acc, ix) => {
      return acc.concat(ix.instructions)
    }, [] as TransactionInstruction[])
  }
  return (
    <>
      <Header network={currentNetwork} disableActions onNetworkChange={() => {}}></Header>
      <SignTransaction
        onConfirm={async () => {
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
        }}
        onReject={async () => {
          chrome.runtime.sendMessage({
            ...data,
            data: null,
            type: ACTION_TYPE.REQUEST_RESOLVED
          })
          window.close()
        }}
        transactions={instructions.map(ix => ix.programId.toString())}
        website={data.data.host}></SignTransaction>
    </>
  )
}
export default Confirm
