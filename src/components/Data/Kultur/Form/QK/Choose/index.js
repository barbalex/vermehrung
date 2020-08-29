import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import Row from './Row'
import { StoreContext } from '../../../../../../models/reactUtils'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = () => {
  const store = useContext(StoreContext)
  const { kulturQksSorted } = store
  const { activeNodeArray } = store.tree
  const kulturId = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const rows = kulturQksSorted

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {rows.map((row) => (
            <Row key={row.name} kulturId={kulturId} qk={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
