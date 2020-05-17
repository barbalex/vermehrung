import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: ${(props) =>
    props['data-last'] ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`
const Key = styled.div`
  width: 130px;
  color: rgba(0, 0, 0, 0.54);
`
const Value = styled.div``

const ConflictData = ({ dataArray, loading }) => {
  if (loading) return 'Lade...'
  return dataArray.map((d, index) => (
    <Row key={d.key} data-last={index + 1 === dataArray.length}>
      <Key>{`${d.key}:`}</Key>
      <Value>{d.value}</Value>
    </Row>
  ))
}

export default ConflictData
