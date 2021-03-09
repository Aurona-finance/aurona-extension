import React from 'react'
import { storiesOf } from '@storybook/react'
import Divider from './Divider'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('Elements/Divider', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <Divider />
      </div>
    )
  })
