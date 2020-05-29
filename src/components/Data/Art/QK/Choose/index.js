import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import RowComponent from './Row'
import { StoreContext, useQuery } from '../../../../../models/reactUtils'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = ({ refetchTab }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray } = store.tree
  const artId = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const { error, loading } = useQuery((store) =>
    store.queryArt_qk({
      order_by: [{ sort: 'asc_nulls_last' }, { name: 'asc_nulls_first' }],
    }),
  )
  const rows = [...store.art_qks.values()]

  if (error) return <Container>{`Fehler: ${error.message}`}</Container>
  if (loading) return <Container>Lade Daten...</Container>
  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {rows.map((row) => (
            <RowComponent
              key={row.name}
              artId={artId}
              qk={row}
              refetchTab={refetchTab}
            />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
