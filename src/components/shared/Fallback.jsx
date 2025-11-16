import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

const SpinnerContainer = styled.div`
  min-height: calc(100dvh - var(--app-bar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Fallback = () => (
  <SpinnerContainer>
    <CircularProgress />
  </SpinnerContainer>
)
