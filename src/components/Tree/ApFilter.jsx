import styled from '@emotion/styled'

import { ApFilter } from '../shared/ApFilter.jsx'

const Container = styled.div`
  position: absolute;
  top: -1px;
  right: 50px;
  z-index: 1;
`

export const ApFilterContainer = () => (
  <Container>
    <ApFilter color="inherit" />
  </Container>
)
