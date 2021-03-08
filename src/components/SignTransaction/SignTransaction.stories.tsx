import React from 'react'
import { storiesOf } from '@storybook/react'
import SignTransaction from './SignTransaction'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'

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
            '121212121212',
            'asdasdasdasdasd',
            'asdasdasdasdasd',
            'asdasdasdasdasd',
            'asdasdasdasdasd',
            'asdasdasdasdasd',
            'asdasdasdasdasd'
          ]}
        />
      </div>
    )
  })
