import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import { SolanaNetworks } from '@static/index'

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
          network={network}
        />
      </div>
    )
  })
