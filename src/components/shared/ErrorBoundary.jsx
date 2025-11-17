import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary'
import styled from '@emotion/styled'
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

const StyledButton = styled(Button)`
  text-transform: none !important;
`
const Details = styled.details`
  margin-bottom: 25px;
`
const Summary = styled.summary`
  user-select: none;
  &:focus {
    outline: none !important;
  }
`
const PreWrapping = styled.pre`
  white-space: normal;
`
const Pre = styled.pre`
  background-color: rgba(128, 128, 128, 0.09);
`

const onReload = () => window.location.reload(true)

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
  // ISSUE:
  // watermelondb throws error when record not found
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
      <PreWrapping>{error.message}</PreWrapping>
      <Details>
        <Summary>Mehr Informationen</Summary>
        <Pre>{componentStack}</Pre>
      </Details>
      <div className={buttonContainer}>
        <StyledButton
          variant="outlined"
          onClick={onReload}
          color="inherit"
        >
          neu starten
        </StyledButton>
      </div>
      <div className={buttonContainer}>
        <StyledButton
          variant="outlined"
          onClick={resetErrorBoundary}
          color="inherit"
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </StyledButton>
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
