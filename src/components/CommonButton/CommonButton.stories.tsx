import React from 'react'
import { storiesOf } from '@storybook/react'
import CommonButton from './CommonButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '../../../.storybook/decorators'
storiesOf('buttons/CommonButton', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => <CommonButton name='Read litepaper' onClick={action('clicked')} />)
