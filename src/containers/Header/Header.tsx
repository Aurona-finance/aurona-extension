import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { network } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaConnection'
import { actions as walletActions } from '@reducers/solanaWallet'
import { SolanaNetworks, STORAGE_KEYS } from '@static/index'
import { wallets, address } from '@selectors/solanaWallet'
import { setDataExtensionStorage } from '@static/utils'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const currentNetwork = useSelector(network)
  const userAddress = useSelector(address)
  const userWallets = useSelector(wallets)
  return (
    <Header
      network={currentNetwork}
      onAirdrop={() => {
        dispatch(walletActions.airdrop())
      }}
      accounts={userWallets.map(w => {
        return { publicKey: w.publicKey, type: w.type, selected: w.publicKey === userAddress }
      })}
      onNewLedgerAccount={async () => {
        await setDataExtensionStorage(STORAGE_KEYS.CONNECT, true)
        chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/popup.html` })
      }}
      existLedger={!!userWallets.find(w => w.type === 'ledger')}
      onWalletChange={publicKey => {
        const wallet = userWallets.find(wallet => wallet.publicKey === publicKey)
        if (wallet) {
          if (userAddress !== wallet.publicKey) {
            dispatch(walletActions.changeWallet(wallet))
          }
        }
      }}
      onNetworkChange={(network: SolanaNetworks) => {
        if (network !== currentNetwork) {
          dispatch(actions.changeNetwork(network))
        }
      }}></Header>
  )
}

export default HeaderWrapper
