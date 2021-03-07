import React from 'react'
import { storiesOf } from '@storybook/react'
import SelectCreateAccount from './SelectCreateAccount'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'

storiesOf('Pages/SelectCreateAccount', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <SelectCreateAccount
          onNew={() => {
            console.log('new')
          }}
          onFromSeed={() => {
            console.log('onFromSeed')
          }}
        />
      </div>
    )
  })
