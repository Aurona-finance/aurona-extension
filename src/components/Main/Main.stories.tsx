import React from 'react'
import { storiesOf } from '@storybook/react'
import Main from './Main'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import BN from 'bn.js'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'

storiesOf('Pages/Main', module)
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
          network={network}></Header>
        <Main
          onSend={() => console.log('send')}
          balance={new BN(100223).toString()}
          balanceUsd={new BN(100232).toString()}
          address='BVY7sD418vuos1vEQjeHkFgnYVJYmwhqr5jDcaxRHxwx'
        />
      </>
    )
  })
