import { PublicKey } from '@solana/web3.js'

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
export { SolanaNetworks, DEFAULT_PUBLICKEY }
