import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import sortBy from 'lodash/sortBy'
import isUuid from 'is-uuid'

import Row from './Row'
import StoreContext from '../../../../../../storeContext'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
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
  const kulturId = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const [kulturQks, setKulturQks] = useState([])
  useEffect(() => {
    const kulturQksObservable = db.get('kultur_qk').query(notDeletedQuery)
    const subscription = kulturQksObservable.subscribe((kulturQks) =>
      setKulturQks(sortBy(kulturQks, 'name')),
    )

    return () => subscription.unsubscribe()
  }, [db])

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {kulturQks.map((row) => (
            <Row key={row.name} kulturId={kulturId} qk={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
