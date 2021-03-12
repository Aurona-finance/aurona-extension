import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
import { SolanaNetworks } from '@static/index'
import { Account } from '@solana/web3.js'

storiesOf('Pages/Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    const [network, setNetwork] = React.useState<SolanaNetworks>(SolanaNetworks.MAIN)
    return (
      <div>
        <Header
          onNetworkChange={net => {
            setNetwork(net)
          }}
          accounts={[
            { selected: false, publicKey: new Account().publicKey.toString(), type: 'aurona' },
            { selected: true, publicKey: new Account().publicKey.toString(), type: 'ledger' }
          ]}
          network={network}
        />
      </div>
    )
  })
