import React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { Row } from './Row.jsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.jsx'

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

export const Choose = observer(({ qks }) => (
  <ErrorBoundary>
    <Container>
      <Info>Diese Wahl gilt für alle Arten</Info>
      <FieldsContainer>
        {qks.map((row) => (
          <Row
            key={row.id}
            qk={row}
          />
        ))}
      </FieldsContainer>
    </Container>
  </ErrorBoundary>
))
