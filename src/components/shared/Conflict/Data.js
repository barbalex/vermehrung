import React from 'react'
import styled from 'styled-components'
import Diff from 'react-stylable-diff'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import toStringIfPossible from '../../../utils/toStringIfPossible'

const Row = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: ${(props) =>
    props['data-last'] ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  .Difference > del {
    background-color: rgba(216, 67, 21, 0.2);
    text-decoration: none;
  }
  .Difference > ins {
    padding-left: 2px;
    background-color: rgb(201, 238, 211);
    text-decoration: none;
  }
`
const Key = styled.div`
  width: 130px;
  color: rgba(0, 0, 0, 0.54);
`

const ConflictData = ({ dataArray, loading }) => {
  if (loading) return 'Lade...'

  return dataArray.map((d, index) => {
    // need to use get to enable passing paths as key, for instance 'person.name'
    // also stringify because Diff split's it
    let inputA = toStringIfPossible(d.valueInRow)
    let inputB = toStringIfPossible(d.valueInRev)
    console.log('Data', { inputA, inputB, d })
    // explicitly show when only one of the values is empty
    if (inputA !== inputB) {
      inputA = inputA ?? '(kein Wert)'
      inputB = inputB ?? '(kein Wert)'
    }

    return (
      <Row key={d.label} data-last={index + 1 === dataArray.length}>
        <Key>{`${d.label}:`}</Key>
        <Diff inputA={inputA} inputB={inputB} type="sentences" />
      </Row>
    )
  })
}

export default observer(ConflictData)
