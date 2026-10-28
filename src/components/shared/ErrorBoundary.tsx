import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary'
import Button from '@mui/material/Button'

import type { ReactNode } from 'react'

import styles from './ErrorBoundary.module.css'

const onReload = () => window.location.reload()

const ErrorFallback = ({
  error,
  componentStack,
  resetErrorBoundary,
}: {
  error: Error
  componentStack?: string | null
  resetErrorBoundary: () => void
}) => {
  // ISSUE:
  // WatermelonDB throws error when record not found
  // this can happen when data is loaded first time and url is direct link to a dataset
  // turned off as using own ErrorBoundary to catch this
  /*const lcMessage = error.message.toLowerCase()
  if (lcMessage.includes('record') && lcMessage.includes('not found')) {
    console.log('ErrorBoundary', error.message)
    return null
  }*/

  return (
    <div className={styles.container}>
      <p>Sorry, ein Fehler ist aufgetreten:</p>
      <pre className={styles.preWrapping}>{error.message}</pre>
      <details className={styles.details}>
        <summary className={styles.summary}>Mehr Informationen</summary>
        <pre className={styles.pre}>{componentStack}</pre>
      </details>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={onReload}
          color="inherit"
          className={styles.button}
        >
          neu starten
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={resetErrorBoundary}
          color="inherit"
          className={styles.button}
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </Button>
      </div>
    </div>
  )
}

export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundaryComponent
      // componentStack is passed at runtime but not part of FallbackProps
      FallbackComponent={
        ErrorFallback as unknown as import('react').ComponentType<
          import('react-error-boundary').FallbackProps
        >
      }
      onReset={onReload}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
