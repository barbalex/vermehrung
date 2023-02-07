import React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import Row from './Row'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`
const Info = styled.div`
  text-align: center;
`

const ChooseQk = ({ qks }) => (
  <ErrorBoundary>
    <Container>
      <Info>Diese Wahl gilt für alle Kulturen</Info>
      <FieldsContainer>
        {qks.map((row) => (
          <Row key={row.id} qk={row} />
        ))}
      </FieldsContainer>
    </Container>
  </ErrorBoundary>
)

export default observer(ChooseQk)
