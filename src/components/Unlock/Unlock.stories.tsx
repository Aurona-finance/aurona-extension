import React from 'react'
import { storiesOf } from '@storybook/react'
import Unlock from './Unlock'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'

storiesOf('Pages/Unlock', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <Unlock
          onClick={(passowrd) => {
            console.log(passowrd)
          }}
        />
      </div>
    )
  })
