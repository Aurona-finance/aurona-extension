import React from 'react'
import { storiesOf } from '@storybook/react'
import ListEntry from './ListEntry'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'

storiesOf('Elements/ListEntry', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)

  .add('default', () => {
    return (
      <div style={{ width: 280 }}>
        <ListEntry text='https://api.mainnet-beta.solana.com/' label='Testnet' selected />
        <div style={{ height: 30 }}></div>
        <ListEntry text='https://api.mainnet-beta.solana.com/' label='Mainnet' />
      </div>
    )
  })
