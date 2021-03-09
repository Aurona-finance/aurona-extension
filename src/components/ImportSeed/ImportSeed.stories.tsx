import React from 'react'
import { storiesOf } from '@storybook/react'
import ImportSeed from './ImportSeed'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('Pages/ImportSeed', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    return (
      <div>
        <ImportSeed
          onClick={() => {
            console.log('click')
          }}
        />
      </div>
    )
  })
