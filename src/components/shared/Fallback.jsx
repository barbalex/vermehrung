import React from 'react'
import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

import constants from '../../utils/constants'

const SpinnerContainer = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Fallback = () => (
  <SpinnerContainer>
    <CircularProgress />
  </SpinnerContainer>
)

export default Fallback
