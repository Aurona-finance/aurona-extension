import React from 'react'
import { storiesOf } from '@storybook/react'
import AccountDetails from './AccountDetails'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
import BN from 'bn.js'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'

storiesOf('Pages/AccountDetails', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    const [network, setNetwork] = React.useState<SolanaNetworks>(SolanaNetworks.MAIN)

    return (
      <>
        <Header
          onNetworkChange={net => {
            setNetwork(net)
          }}
          onAirdrop={() => {}}
          network={network}></Header>
        <AccountDetails
          onSend={() => console.log('send')}
          onBack={() => console.log('back')}
          balance={new BN(100223).toString()}
          address='BVY7sD418vuos1vEQjeHkFgnYVJYmwhqr5jDcaxRHxwx'
          tokenAddress='BVY21127sD418vuos1vEQjeHkFgnYVJYmwhqr5jDcaxRHxwx'
        />
      </>
    )
  })
