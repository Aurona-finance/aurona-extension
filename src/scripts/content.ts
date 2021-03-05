/* eslint-disable @typescript-eslint/return-await */
import { ACTION_TYPE } from '../static/index'

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/promise-function-async */
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import Provider from './provider'
// console.log(chrome)

console.log('Begin injecting')
var eventsMap = new Map<string, { resolve: any }>()
export class ExtensionWallet implements Wallet {
  constructor(readonly payer: PublicKey) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    return new Promise(resolve => {
      const id = Math.random().toString()
      eventsMap.set(id, { resolve: resolve })
      window.postMessage(
        {
          type: ACTION_TYPE.REQUEST_NEW,
          id,
          data: {
            transaction: JSON.stringify(
              tx.serialize({ requireAllSignatures: false, verifySignatures: false })
            )
          }
        },
        '*'
      )
    })
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return new Promise(resolve => {
      const id = Math.random().toString()
      eventsMap.set(id, { resolve: resolve })
      window.postMessage(
        {
          type: ACTION_TYPE.REQUEST_NEW,
          id,
          data: {
            transactions: JSON.stringify(
              txs.map(tx => tx.serialize({ requireAllSignatures: false, verifySignatures: false }))
            )
          }
        },
        '*'
      )
    })
  }

  get publicKey(): PublicKey {
    return this.payer
  }
}

const provider = new Provider(
  new Connection('https://devnet.solana.com'),
  Provider.defaultOptions(),
  eventsMap
)
window.solanaProvider = provider

// resolver
window.addEventListener(
  'message',
  e => {
    if (e.data.type === ACTION_TYPE.REQUEST_RESOLVED) {
      // console.log(e.data)
      const req = eventsMap.get(e.data.id)
      if (req) {
        const tx = JSON.parse(e.data.data)
        if (Array.isArray(tx)) {
          const txs = tx.map((tx: any) => {
            return Transaction.from(tx.data)
          })
          req.resolve(txs)
        } else {
          req.resolve(Transaction.from(tx.data))
        }
        // console.log(Transaction.from(btx.data))
        eventsMap.delete(e.data.id)
      }
    }
    if (e.data.type === ACTION_TYPE.ENABLE_DONE) {
      const req = eventsMap.get(e.data.id)
      if (req) {
        req.resolve()
        eventsMap.delete(e.data.id)
      }
      window.solanaProvider.connectWallet(new ExtensionWallet(new PublicKey(e.data.userAddress)))
    }
    // window.postMessage(e.data, '*')
  },
  false
)
console.log('SolanaProvider injected')
/* eslint-disable @typescript-eslint/no-var-requires */

export interface Wallet {
  signTransaction: (tx: Transaction) => Promise<Transaction>
  signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>
  publicKey: PublicKey
}
