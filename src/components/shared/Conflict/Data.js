import React from 'react'
import styled from 'styled-components'
import Diff from 'react-stylable-diff'
import get from 'lodash/get'

import toStringIfPossible from '../../../utils/toStringIfPossible'

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
    // need to use get to enable passing paths as key, for instance 'person.name'
    let inputA = get(row, d.key)
    let inputB = d.value
    if (['boolean', 'number'].includes(d?.type)) {
      inputA = toStringIfPossible(inputA)
      inputB = toStringIfPossible(inputB)
    }
    console.log('Data', { row, key: d.key, inputA })
    // explicitly show when only one of the values is empty
    if (inputA !== inputB) {
      inputA = inputA ?? '(kein Wert)'
      inputB = inputB ?? '(kein Wert)'
    }
    return (
      <Row key={d.key} data-last={index + 1 === dataArray.length}>
        <Key>{`${d.key}:`}</Key>
        <Diff inputA={inputA} inputB={inputB} type="sentences" />
      </Row>
    )
  })
}

export default ConflictData
