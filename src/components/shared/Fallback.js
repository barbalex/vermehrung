import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  padding: 10px;
`

const Fallback = () => <LoadingContainer>Lade...</LoadingContainer>

export default Fallback
