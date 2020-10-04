import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import RowComponent from './Row'
import { StoreContext } from '../../../../../../models/reactUtils'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import qkSort from '../../../../../../utils/qkSort'
import notDeletedOrHasConflict from '../../../../../../utils/notDeletedOrHasConflict'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = () => {
  const store = useContext(StoreContext)
  const { art_qks } = store
  const { activeNodeArray } = store.tree
  const artId = last(activeNodeArray.filter((e) => isUuid.v1(e)))
  const artQksSorted = useMemo(
    () =>
      [...art_qks.values()]
        .filter((a) => notDeletedOrHasConflict(a))
        .sort((a, b) => qkSort({ a, b })),
    [art_qks],
  )

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {artQksSorted.map((row) => (
            <RowComponent key={row.name} artId={artId} qk={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
