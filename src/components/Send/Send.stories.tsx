import React from 'react'
import { storiesOf } from '@storybook/react'
import Send from './Send'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'
import BN from 'bn.js'
import { Account } from '@solana/web3.js'

storiesOf('Pages/Send', module)
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
          network={network}></Header>
        <Send
          onCancel={() => {
            console.log('onCancel')
          }}
          balance={new BN(10 * 1e8)}
          decimals={8}
          ticker={'SOL'}
          tokenAddress={new Account().publicKey}
          onSend={() => {
            console.log('onConfirm')
          }}
        />
      </div>
    )
  })
  .add('unkown token', () => {
    const [network, setNetwork] = React.useState<SolanaNetworks>(SolanaNetworks.MAIN)

    return (
      <div>
        <Header
          onNetworkChange={net => {
            setNetwork(net)
          }}
          network={network}></Header>
        <Send
          onCancel={() => {
            console.log('onCancel')
          }}
          balance={new BN(10 * 1e8)}
          decimals={8}
          tokenAddress={new Account().publicKey}
          onSend={() => {
            console.log('onConfirm')
          }}
        />
      </div>
    )
  })
