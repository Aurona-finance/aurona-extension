import React, { useState } from 'react'
import { Tooltip } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import useStyles from './style'
export interface IProps {
  text: string
  children: JSX.Element
}
export const CopyToolTip: React.FC<IProps> = ({ text, children }) => {
  const classes = useStyles()
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <Tooltip
        title={copied ? 'Copied' : 'Click to copy'}
        arrow
        PopperProps={{ disablePortal: true }}
        placement='bottom'
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
        <div className={classes.wrapper}>
          <CopyToClipboard
            text={text}
            onCopy={() => {
              setCopied(true)
              setTimeout(() => {
                setCopied(false)
              }, 1000)
            }}>
            {children}
          </CopyToClipboard>
        </div>
      </Tooltip>
    </div>
  )
}
export default CopyToolTip
