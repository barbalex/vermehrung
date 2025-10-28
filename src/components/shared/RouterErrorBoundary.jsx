import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouteError } from 'react-router'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'

import { logout } from '../../utils/logout.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'

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

export const RouterErrorBoundary = observer(({ children }) => {
  const error = useRouteError()
  const store = useContext(MobxStoreContext)

  const onReset = () => logout({ store })

  console.log('RouterErrorBoundary caught error:', error)

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
          onClick={onReset}
          color="inherit"
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
})
