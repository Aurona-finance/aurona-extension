import React from 'react'
import { storiesOf } from '@storybook/react'
import CreateAccount from './CreateAccount'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('Pages/CreateAccount', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <CreateAccount
          onClick={() => {
            console.log('click')
          }}
        />
      </div>
    )
  })
