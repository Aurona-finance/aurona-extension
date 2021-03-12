import { PublicKey } from '@solana/web3.js'

export enum STORAGE_KEYS {
  SELECTED_WALLET = 'SELECTED_WALLET',
  CONNECT = 'CONNECT',
  ALL_WALLETS = 'ALL_WALLETS',
  SEED = 'SEED'
}
export enum ACTION_TYPE {
  DEFAULT = 'DEFAULT',
  REQUEST_NEW = 'REQUEST_NEW',
  REQUEST_RESOLVE = 'REQUEST_RESOLVE',
  REQUEST_OPEN_CONFIRM = 'REQUEST_OPEN_CONFIRM',
  REQUEST_RESOLVED = 'REQUEST_RESOLVED',
  ENABLE = 'ENABLE',
  ENABLE_DONE = 'ENABLE_DONE',
  NETWORK_CHANGE = 'NETWORK_CHANGE'
}

enum SolanaNetworks {
  DEV = 'https://devnet.solana.com',
  TEST = 'https://testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com'
}
export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return 'Devnet'

    case SolanaNetworks.TEST:
      return 'Testnet'

    case SolanaNetworks.MAIN:
      return 'Mainnet'

    default:
      return 'DEVNET'
  }
}
const DEFAULT_PUBLICKEY = new PublicKey(0)
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
export { SolanaNetworks, DEFAULT_PUBLICKEY, TOKEN_PROGRAM_ID }
