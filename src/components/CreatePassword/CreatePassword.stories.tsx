import React from 'react'
import { storiesOf } from '@storybook/react'
import CreatePassword from './CreatePassword'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('Pages/CreatePassword', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    const [password, setPassword] = React.useState('')
    return (
      <div>
        <CreatePassword
          password={password}
          setPassword={setPassword}
          onClick={() => {
            console.log('click')
          }}
        />
      </div>
    )
  })
