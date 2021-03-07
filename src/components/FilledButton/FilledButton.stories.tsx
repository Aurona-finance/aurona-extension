import React from 'react'
import { storiesOf } from '@storybook/react'
import FilledButton from './FilledButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('buttons/FilledButton', module)
  .addDecorator(withKnobs)
  .add('color', () => <FilledButton name='Import account' onClick={action('clicked')} />)
  .add('gray', () => <FilledButton name='Set to max' onClick={action('clicked')} variant='gray' />)
  .add('disabled', () => <FilledButton name='Set to max' onClick={action('clicked')} disabled variant='gray' />)
