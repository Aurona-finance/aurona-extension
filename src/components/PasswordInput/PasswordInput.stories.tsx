import React from 'react'
import { storiesOf } from '@storybook/react'
import PasswordInput from './PasswordInput'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('inputs/PasswordInput', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)

  .add('default', () => {
    const [password, setPassword] = React.useState('')
    return (
      <div>
        <PasswordInput password={password} setPassword={setPassword} label='Password*' />
      </div>
    )
  })
