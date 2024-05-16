import React, { useCallback } from 'react'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import ErrorBoundary from '../components/shared/ErrorBoundary.jsx'
import constants from '../utils/constants.js'
import image from '../images/puls_vulg_2500.webp'
import placeholderSrc from '../images/puls_vulg_500.webp' // TODO: build small placeholder
import ProgressiveImg from '../components/shared/ProgressiveImg.tsx'

const OuterContainer = styled.div`
  height: calc(100% - ${constants.appBarHeight}px);
  position: relative;
  overflow: hidden;
`
const ScrollContainer = styled.div`
  height: calc(100dvh - ${constants.appBarHeight}px);
  width: 100%;
  position: absolute;
  top: 0;
  overflow-y: auto;
  /* prevent layout shift when scrollbar appears */
  scrollbar-gutter: stable;
`
const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700 !important;
  text-shadow:
    2px 2px 3px white,
    -2px -2px 3px white,
    2px -2px 3px white,
    -2px 2px 3px white;
`
const PageTitle = styled(Typography)`
  font-size: 2em !important;
  padding: 15px;
  font-weight: 700 !important;
`
const Text = styled(Typography)`
  font-size: 1.5em !important;
  padding: 15px;
  font-weight: 700 !important;
`
const StyledButton = styled(Button)`
  text-shadow:
    2px 2px 3px white,
    -2px -2px 3px white,
    2px -2px 3px white,
    -2px 2px 3px white;
  border-color: white !important;
  margin-top: 10px !important;
`

const Index = () => {
  const navigate = useNavigate()
  const onClickBack = useCallback(() => navigate('/'), [navigate])

  return (
    <>
      <ErrorBoundary>
        <OuterContainer>
          <ProgressiveImg src={image} placeholderSrc={placeholderSrc} />
          <ScrollContainer>
            <TextContainer>
              <PageTitle align="center" variant="h6">
                Oh je
              </PageTitle>
            </TextContainer>
            <TextContainer>
              <Text align="center" variant="h6">
                Diese Seite ist nicht verfügbar.
              </Text>
            </TextContainer>
            <TextContainer>
              <StyledButton
                variant="outlined"
                onClick={onClickBack}
                color="inherit"
              >
                Zurück zur Startseite
              </StyledButton>
            </TextContainer>
          </ScrollContainer>
        </OuterContainer>
      </ErrorBoundary>
    </>
  )
}

export default Index
