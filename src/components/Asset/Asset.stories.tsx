import React from 'react'
import { storiesOf } from '@storybook/react'
import Asset from './Asset'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
import BN from 'bn.js'

storiesOf('Components/Asset', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <Asset
          onClick={() => console.log('click')}
          balance={new BN(100223).toString()}
          balanceUsd={new BN(100232).toString()}
          name='ETH'
        />
      </div>
    )
  })
