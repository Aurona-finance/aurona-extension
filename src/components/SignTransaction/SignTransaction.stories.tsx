import React from 'react'
import { storiesOf } from '@storybook/react'
import SignTransaction from './SignTransaction'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'
import BN from 'bn.js'
import { Account } from '@solana/web3.js'

storiesOf('Pages/SignTransaction', module)
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
          disableActions
          network={network}></Header>
        <SignTransaction
          onReject={() => {
            console.log('onReject')
          }}
          onConfirm={() => {
            console.log('onConfirm')
          }}
          website='synthetify.io'
          transactions={[
            {
              amount: new BN(0),
              operation: 'Transfer',
              text: `Transfer ${10 * 1e9} SOL to ${new Account().publicKey.toString()}`
            },
            {
              amount: new BN(0),
              operation: 'Transfer',
              text: `Transfer ${10 * 1e9} SOL to ${new Account().publicKey.toString()}`
            },
            {
              amount: new BN(0),
              operation: 'Transfer',
              text: `Transfer ${10 * 1e9} SOL to ${new Account().publicKey.toString()}`
            }
          ]}
        />
      </div>
    )
  })
