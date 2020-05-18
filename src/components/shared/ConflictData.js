import React from 'react'
import styled from 'styled-components'
import Diff from 'react-stylable-diff'

const Row = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: ${(props) =>
    props['data-last'] ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  .Difference > ins {
    padding-left: 2px;
  }
`
const Key = styled.div`
  width: 130px;
  color: rgba(0, 0, 0, 0.54);
`

const ConflictData = ({ dataArray, loading, row }) => {
  if (loading) return 'Lade...'
  return dataArray.map((d, index) => {
    const inputA = row[d.key]
    const inputB = d.value

    return (
      <Row key={d.key} data-last={index + 1 === dataArray.length}>
        <Key>{`${d.key}:`}</Key>
        <Diff inputA={inputA} inputB={inputB} type="sentences" />
      </Row>
    )
  })
}

export default ConflictData
