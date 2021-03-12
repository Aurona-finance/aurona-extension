import { Account } from '@solana/web3.js'
import { getDataExtensionStorage, storeAccount, retrieveCurrentAccount } from '@static/utils'
import { SolanaNetworks } from '@static/index'

let _wallet: Account
const TokenProgramMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  [SolanaNetworks.TEST]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  [SolanaNetworks.MAIN]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
}
const getSolanaWallet = async (): Promise<Account> => {
  if (_wallet) {
    return _wallet
  }
  _wallet = await getHotAccount()
  return _wallet
}
export const getHotAccount = async (): Promise<Account> => {
  const current = await retrieveCurrentAccount()
  console.log(current)
  if (current.type === 'ledger') {
    throw Error('Current wallet is hardware')
  }
  const acc = current.account
  _wallet = acc
  return acc
}

export { getSolanaWallet, TokenProgramMap }
