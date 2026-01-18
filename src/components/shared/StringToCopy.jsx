// seems not in use
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Button from '@mui/material/Button'

import { ErrorBoundary } from './ErrorBoundary.jsx'

import styles from './StringToCopy.module.css'

export const StringToCopy = ({ text, label }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    // can fire after component was unmounted...
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.labelClass}>{label}</div>
        <div className={styles.stringToCopyContainer}>
          <div className={styles.guidContainer}>{text}</div>
          <div className={styles.copyButtonContainer}>
            <CopyToClipboard
              text={text}
              onCopy={onCopy}
            >
              <Button
                color="primary"
                onCopy={onCopy}
              >
                {copied ? `${label} kopiert` : `${label} kopieren`}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
