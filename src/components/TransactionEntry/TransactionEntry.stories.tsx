import React from 'react'
import { storiesOf } from '@storybook/react'
import TransactionEntry from './TransactionEntry'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'

storiesOf('Elements/TransactionEntry', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)

  .add('default', () => {
    return (
      <div style={{ width: 280 }}>
        <TransactionEntry text='https://api.mainnet-beta.solana.com/' label='Transaction #2' />
      </div>
    )
  })
