import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import query from './query'
import RowComponent from './Row'
import { StoreContext } from '../../../../../models/reactUtils'
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

  const { data, error, loading } = useQuery(query)
  const rows = get(data, 'art_qk')

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
