import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'

import useStyles from './style'
export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: 'gray' | 'color'
  className?: string
  disabled?: boolean
  startIcon?: JSX.Element
}
export const FilledButton: React.FC<IProps> = ({
  name,
  onClick,
  className,
  disabled = false,
  startIcon,
  variant = 'color'
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(
        className,
        variant === 'color' ? classes.buttonColor : classes.buttonGray
      )}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
export default FilledButton
