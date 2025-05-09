import React from 'react'
import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

import { constants } from '../../utils/constants.js'

const SpinnerContainer = styled.div`
  min-height: calc(100dvh - ${constants.appBarHeight}px);
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
