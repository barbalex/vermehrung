import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary'
import Button from '@mui/material/Button'

import { logout } from '../../utils/logout.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'

import {
  container,
  buttonContainer,
  button,
  details,
  summary,
  preWrapping,
  pre,
} from './ErrorBoundary.module.css'

const onReload = () => window.location.reload(true)

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
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
    <div className={container}>
      <p>Sorry, ein Fehler ist aufgetreten:</p>
      <pre className={preWrapping}>{error.message}</pre>
      <details className={details}>
        <summary className={summary}>Mehr Informationen</summary>
        <pre className={pre}>{componentStack}</pre>
      </details>
      <div className={buttonContainer}>
        <Button
          variant="outlined"
          onClick={onReload}
          color="inherit"
          className={button}
        >
          neu starten
        </Button>
      </div>
      <div className={buttonContainer}>
        <Button
          variant="outlined"
          onClick={resetErrorBoundary}
          color="inherit"
          className={button}
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </Button>
      </div>
    </div>
  )
}

export const ErrorBoundary = ({ children }) => {
  const store = useContext(MobxStoreContext)

  const onReset = () => logout({ store })

  return (
    <ErrorBoundaryComponent
      FallbackComponent={ErrorFallback}
      onReset={onReload}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
