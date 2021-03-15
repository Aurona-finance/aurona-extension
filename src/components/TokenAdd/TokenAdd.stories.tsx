import React from 'react'
import { storiesOf } from '@storybook/react'
import TokenAdd from './TokenAdd'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('Components/TokenAdd', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <TokenAdd
          onAdd={() => {}}
          token={{
            address: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
            chainId: 101,
            decimals: 6,
            name: 'Wrapped Bitcoin',
            symbol: 'BTC',
            logoURI:
              'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/bitcoin/info/logo.png'
          }}
        />
      </div>
    )
  })
