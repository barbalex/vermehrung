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
const Info = styled.div`
  text-align: center;
`

const ChooseQk = ({ qks, userPersonOption }) => (
  <ErrorBoundary>
    <Container>
      <Info>Diese Wahl gilt für alle Kulturen</Info>
      <FieldsContainer>
        {qks.map((row) => (
          <Row key={row.id} qk={row} userPersonOption={userPersonOption} />
        ))}
      </FieldsContainer>
    </Container>
  </ErrorBoundary>
)

export default observer(ChooseQk)
