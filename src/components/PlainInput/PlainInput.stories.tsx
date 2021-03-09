import React from 'react'
import { storiesOf } from '@storybook/react'
import PlainInput from './PlainInput'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('inputs/PlainInput', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)

  .add('default', () => {
    const [value, setValue] = React.useState('')
    return (
      <div>
        <PlainInput value={value} setValue={setValue} label='Token Address*' />
      </div>
    )
  })
  .add('error', () => {
    const [value, setValue] = React.useState('')
    return (
      <div>
        <PlainInput
          value={value}
          setValue={setValue}
          label='Token Address*'
          error='invalid account'
        />
      </div>
    )
  })
