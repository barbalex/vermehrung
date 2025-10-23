import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'

const Container = styled.div`
  padding: 15px;
`
const ButtonContainer = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`
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
    <Container>
      <p>Sorry, ein Fehler ist aufgetreten:</p>
      <PreWrapping>{error.message}</PreWrapping>
      <Details>
        <Summary>Mehr Informationen</Summary>
        <Pre>{componentStack}</Pre>
      </Details>
      <ButtonContainer>
        <StyledButton
          variant="outlined"
          onClick={onReload}
          color="inherit"
        >
          neu starten
        </StyledButton>
      </ButtonContainer>
      <ButtonContainer>
        <StyledButton
          variant="outlined"
          onClick={resetErrorBoundary}
          color="inherit"
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}

export const ErrorBoundary = ({ children }) => (
  <ErrorBoundaryComponent
    FallbackComponent={ErrorFallback}
    onReset={onReload}
  >
    {children}
  </ErrorBoundaryComponent>
)
