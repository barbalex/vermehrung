import React, { useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  display: flex;
`
const Value = styled.div`
  padding: 5px;
`

const QueuedQuery = ({ qq }) => {
  const store = useContext(StoreContext)
  const { time, revertTable, revertField, revertValue, newValue } = qq

  /**
   * TODO:
   * - revert
   * - revert all
   * - delete
   * - delete all
   * - nice table
   */

  return (
    <Container>
      <Value>{`${moment(time).format('YYYY.MM.DD hh.mm.ss')}:`}</Value>
      <Value>{`${revertTable}.${revertField}`}</Value>
      <Value>{`${revertValue} > ${newValue}`}</Value>
    </Container>
  )
}

export default observer(QueuedQuery)
