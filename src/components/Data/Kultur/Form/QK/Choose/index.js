import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import Row from './Row'
import { StoreContext } from '../../../../../../models/reactUtils'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import notDeletedOrHasConflict from '../../../../../../utils/notDeletedOrHasConflict'
import qkSort from '../../../../../../utils/qkSort'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = () => {
  const store = useContext(StoreContext)
  const { kultur_qks } = store
  const { activeNodeArray } = store.tree
  const kulturId = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const rows = useMemo(
    () =>
      [...kultur_qks.values()]
        .filter((a) => notDeletedOrHasConflict(a))
        .sort((a, b) => qkSort({ a, b })),
    [kultur_qks],
  )

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
