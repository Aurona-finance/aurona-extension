import { PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js'
import { decodeTransaction } from '@static/transactionDecoder'
import { tou64 } from '@static/utils'
import BN from 'bn.js'
import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'
import { getToken, getWallet } from './wallet'

export function* sendSol(amount: BN, recipient: PublicKey): SagaGenerator<string> {
  // const connection = yield* call(getConnection)
  // const wallet = yield* call(getWallet)
  // const transaction = new Transaction().add(
  //   SystemProgram.transfer({
  //     fromPubkey: wallet.publicKey,
  //     toPubkey: recipient,
  //     lamports: amount.toNumber()
  //   })
  // )
  // const txid = yield* call(sendAndConfirmTransaction, connection, transaction, [wallet])
  // return txid
  return '123'
}

export function* sendToken(
  from: PublicKey,
  target: PublicKey,
  amount: BN,
  tokenAddress: PublicKey
): SagaGenerator<string> {
  // const token = yield* call(getToken, tokenAddress)
  // const wallet = yield* call(getWallet)
  // const signature = yield* call([token, token.transfer], from, target, wallet, [], tou64(amount))
  // return signature
  return '123'
}
