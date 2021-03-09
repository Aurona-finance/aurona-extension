import React from 'react'
import { storiesOf } from '@storybook/react'
import MultilineText from './MultilineText'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'

storiesOf('inputs/MultilineText', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)

  .add('default', () => {
    return (
      <div style={{ width: 280 }}>
        <MultilineText
          text='rlife robot typeface color blob idk google mass people glass donkey top phone mouse whiskers run boots umami meat true god eye lash'
          label='Your seed*'
        />
      </div>
    )
  })

  .add('input', () => {
    const [password, setPassword] = React.useState('')
    console.log(password)
    return (
      <div style={{ width: 280 }}>
        <MultilineText text={password} label='Your seed*' onChange={setPassword} />
      </div>
    )
  })
