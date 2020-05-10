import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import moment from 'moment'

import { StoreContext } from '../../../models/reactUtils'

const singleRowHeight = 48
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${singleRowHeight};
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: ${(props) => (props['data-last'] ? '1px' : 'thin')} solid
    rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  margin: -1px 0;
  padding: 10px;
  cursor: pointer;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`

const EventsRows = ({ row, style, last }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )
  const datum = row.datum
    ? moment(row.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
    : `Kein Datum. ID: ${row.id}`
  const garten = get(row, 'kulturByVonKulturId.garten.name')
  const gartenPerson = get(row, 'kulturByVonKulturId.garten.person.name')
  const von = garten || gartenPerson ? `, von: ${garten || gartenPerson}` : ''
  const werPerson = get(row, 'person.name')
  const wer = werPerson ? `, wer: ${werPerson}` : ''
  const label = `${datum}${von}${wer}`

  return (
    <Row key={row.id} onClick={onClickRow} style={style} data-last={last}>
      <div>{label}</div>
    </Row>
  )
}

export default observer(EventsRows)
