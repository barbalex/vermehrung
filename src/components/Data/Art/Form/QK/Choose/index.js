import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import RowComponent from './Row'
import { StoreContext } from '../../../../../../models/reactUtils'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import qkSort from '../../../../../../utils/qkSort'
import notDeletedQuery from '../../../../../../utils/notDeletedQuery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = () => {
  const store = useContext(StoreContext)
  const { db } = store
  const { activeNodeArray } = store.tree
  const artId = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const [artQks, setArtQks] = useState([])
  useEffect(() => {
    db.collections
      .get('art_qk')
      .query(notDeletedQuery)
      .fetch()
      .then((artQks) => setArtQks(artQks.sort((a, b) => qkSort({ a, b }))))
  }, [db.collections])

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {artQks.map((row) => (
            <RowComponent key={row.name} artId={artId} qk={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
