import { Connection } from '@solana/web3.js'
import { getDataExtensionStorage, setDataExtensionStorage } from '@static/utils'

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
let _connection: Connection | null = null
let _network: SolanaNetworks

const getSolanaConnection = async (): Promise<Connection> => {
  let url = (await getDataExtensionStorage('network')) as SolanaNetworks
  if (!url) {
    await setDataExtensionStorage('network', SolanaNetworks.DEV)
    url = SolanaNetworks.DEV
  }
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url)
  _network = url
  return _connection
}
const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export { getSolanaConnection, SolanaNetworks, getCurrentSolanaConnection }
