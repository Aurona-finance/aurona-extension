import React from 'react'
import { storiesOf } from '@storybook/react'
import LogoHorizontal from './LogoHorizontal'

import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
storiesOf('logo/LogoHorizontal', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => <LogoHorizontal />)
