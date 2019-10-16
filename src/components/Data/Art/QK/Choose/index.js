import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'
import last from 'lodash/last'

import query from './query'
import RowComponent from './Row'
import storeContext from '../../../../../storeContext'

const Container = styled.div`
  height: calc(100vh - 64px - 43px - 48px);
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
  overflow: auto !important;
  height: 100%;
`

const ChooseQk = ({ refetchTab }) => {
  const store = useContext(storeContext)
  const { activeNodeArray } = store.tree
  const artId = last(activeNodeArray.filter(e => !isNaN(e)))

  const { data, error, loading } = useQuery(query)
  const rows = get(data, 'art_qk')

  if (error) return <Container>{`Fehler: ${error.message}`}</Container>
  if (loading) return <Container>Lade Daten...</Container>
  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {rows.map(row => (
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
