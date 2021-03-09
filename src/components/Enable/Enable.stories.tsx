import React from 'react'
import { storiesOf } from '@storybook/react'
import Enable from './Enable'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'

storiesOf('Pages/Enable', module)
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
        <Enable
          onReject={() => {
            console.log('onReject')
          }}
          onConfirm={() => {
            console.log('onConfirm')
          }}
          website='synthetify.io'
        />
      </div>
    )
  })
