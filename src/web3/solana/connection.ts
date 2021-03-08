import { Connection } from '@solana/web3.js'
import { SolanaNetworks } from '@static/index'
import { getDataExtensionStorage, setDataExtensionStorage } from '@static/utils'

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
  _connection = new Connection(url, 'confirmed')
  _network = url
  return _connection
}
const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export { getSolanaConnection, getCurrentSolanaConnection }
