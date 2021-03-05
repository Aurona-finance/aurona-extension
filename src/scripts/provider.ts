import { ACTION_TYPE } from '../static/index'

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/promise-function-async */
import {
  Connection,
  Account,
  PublicKey,
  Transaction,
  TransactionSignature,
  ConfirmOptions,
  sendAndConfirmRawTransaction
} from '@solana/web3.js'

export default class Provider {
  constructor(
    readonly connection: Connection,
    readonly opts: ConfirmOptions,
    readonly eventsMap: Map<string, { resolve: any; reject: any }>,
    public wallet?: Wallet
  ) {}

  static defaultOptions(): ConfirmOptions {
    return {
      preflightCommitment: 'recent',
      commitment: 'recent'
    }
  }

  public async enable(): Promise<any> {
    console.log('ENABLE')
    return await new Promise((resolve, reject) => {
      const id = Math.random().toString()
      this.eventsMap.set(id, { resolve: resolve, reject })
      window.postMessage(
        { type: ACTION_TYPE.ENABLE, id, data: { host: window.location.host } },
        '*'
      )
    })
  }

  public connectWallet(wallet: Wallet) {
    this.wallet = wallet
  }

  async send(
    tx: Transaction,
    signers?: Array<Account | undefined>,
    opts?: ConfirmOptions
  ): Promise<TransactionSignature> {
    if (!this.wallet) {
      throw Error('Wallet not connected')
    }
    if (signers === undefined) {
      signers = []
    }
    if (opts === undefined) {
      opts = this.opts
    }

    const signerKps = signers.filter(s => s !== undefined) as Account[]
    const signerPubkeys = [this.wallet.publicKey].concat(signerKps.map(s => s.publicKey))

    tx.setSigners(...signerPubkeys)
    tx.recentBlockhash = (
      await this.connection.getRecentBlockhash(opts.preflightCommitment)
    ).blockhash

    tx = await this.wallet.signTransaction(tx)

    signerKps.forEach(kp => {
      tx.partialSign(kp)
    })

    const rawTx = tx.serialize()

    const txId = await sendAndConfirmRawTransaction(this.connection, rawTx, opts)

    return txId
  }

  async sendAll(reqs: SendTxRequest[], opts?: ConfirmOptions): Promise<TransactionSignature[]> {
    if (this.wallet === undefined) {
      throw Error('Wallet not connected')
    }
    if (opts === undefined) {
      opts = this.opts
    }

    const blockhash = await this.connection.getRecentBlockhash(opts.preflightCommitment)

    const txs = reqs.map(r => {
      if (this.wallet === undefined) {
        throw Error('Wallet not connected')
      }
      const tx = r.tx
      let signers = r.signers

      if (signers === undefined) {
        signers = []
      }

      const signerKps = signers.filter(s => s !== undefined) as Account[]
      const signerPubkeys = [this.wallet.publicKey].concat(signerKps.map(s => s.publicKey))

      tx.setSigners(...signerPubkeys)
      tx.recentBlockhash = blockhash.blockhash
      signerKps.forEach(kp => {
        tx.partialSign(kp)
      })

      return tx
    })

    const signedTxs = await this.wallet.signAllTransactions(txs)

    const sigs = []

    for (let k = 0; k < txs.length; k += 1) {
      const tx = signedTxs[k]
      const rawTx = tx.serialize()
      sigs.push(await sendAndConfirmRawTransaction(this.connection, rawTx, opts))
    }

    return sigs
  }
}

export interface SendTxRequest {
  tx: Transaction
  signers: Array<Account | undefined>
}

export interface Wallet {
  signTransaction: (tx: Transaction) => Promise<Transaction>
  signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>
  publicKey: PublicKey
}
