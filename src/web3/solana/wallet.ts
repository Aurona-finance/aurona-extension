import { Account } from '@solana/web3.js'
import { retrieveAccount, getDataExtensionStorage, storeAccount } from '@static/utils'
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
  const nonce = (await getDataExtensionStorage('nonce')) as string
  const acc = await retrieveAccount('hotAccount', nonce)
  _wallet = acc
  return acc
}
export const getColdAccount = async (password: string): Promise<Account> => {
  const acc = await retrieveAccount('coldAccount', password)
  const nonce = (await getDataExtensionStorage('nonce')) as string
  await storeAccount('hotAccount', acc, nonce)
  _wallet = acc
  return acc
}

export { getSolanaWallet, TokenProgramMap }