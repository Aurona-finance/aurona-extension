/* eslint-disable @typescript-eslint/return-await */
import { ACTION_TYPE } from '../static/index'

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/promise-function-async */
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import Provider from './provider'

console.log('Begin injecting')
var eventsMap = new Map<string, { resolve: any; reject: any }>()
export class ExtensionWallet implements Wallet {
  constructor(readonly payer: PublicKey) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString()
      eventsMap.set(id, { resolve: resolve, reject })
      window.postMessage(
        {
          type: ACTION_TYPE.REQUEST_NEW,
          id,
          data: {
            transaction: JSON.stringify(
              tx.serialize({ requireAllSignatures: false, verifySignatures: false })
            ),
            host: window.location.origin
          }
        },
        '*'
      )
    })
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString()
      eventsMap.set(id, { resolve: resolve, reject })
      window.postMessage(
        {
          type: ACTION_TYPE.REQUEST_NEW,
          id,
          data: {
            transactions: JSON.stringify(
              txs.map(tx => tx.serialize({ requireAllSignatures: false, verifySignatures: false }))
            ),
            host: window.location.origin
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
      const req = eventsMap.get(e.data.id)
      if (req) {
        const tx = JSON.parse(e.data.data)
        // null means rejected
        if (tx === null) {
          req.reject()
          return
        }
        if (Array.isArray(tx)) {
          const txs = tx.map((tx: any) => {
            return Transaction.from(tx.data)
          })
          req.resolve(txs)
        } else {
          req.resolve(Transaction.from(tx.data))
        }
        eventsMap.delete(e.data.id)
      }
    }
    if (e.data.type === ACTION_TYPE.ENABLE_DONE) {
      const req = eventsMap.get(e.data.id)
      if (req) {
        if (e.data.data === null) {
          req.reject()
          return
        }
        // Check is extension is on same network
        // @ts-expect-error
        if (e.data.network !== window.solanaProvider.connection._rpcEndpoint) {
          window.solanaProvider.connection = new Connection(e.data.network)
          window.solanaProvider.triggerNetworkChange?.(e.data.network)
        }
        window.solanaProvider.connectWallet(new ExtensionWallet(new PublicKey(e.data.userAddress)))
        req.resolve()
        eventsMap.delete(e.data.id)
      }
    }

    if (e.data.type === ACTION_TYPE.NETWORK_CHANGE) {
      if (window.solanaProvider.triggerNetworkChange) {
        window.solanaProvider.connection = new Connection(e.data.data)
        window.solanaProvider.triggerNetworkChange(e.data.data)
      }
    }
    if (e.data.type === ACTION_TYPE.WALLET_CHANGE) {
      console.log('wallet change')
      if (window.solanaProvider.triggerAccountChange) {
        window.solanaProvider.triggerAccountChange()
      }
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
