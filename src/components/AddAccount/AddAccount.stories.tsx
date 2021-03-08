import React from 'react'
import { storiesOf } from '@storybook/react'
import AddAccount from './AddAccount'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'

storiesOf('Pages/AddAccount', module)
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
        <AddAccount
          onCancel={() => {
            console.log('onCancel')
          }}
          onConfirm={() => {
            console.log('onConfirm')
          }}
        />
      </div>
    )
  })
