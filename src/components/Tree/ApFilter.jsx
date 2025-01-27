import { memo } from 'react'
import styled from '@emotion/styled'

import { ApFilter } from '../shared/ApFilter.jsx'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 45px;
  z-index: 1;
`

export const ApFilterContainer = memo(() => (
  <Container>
    <ApFilter color="inherit" />
  </Container>
))
