import React from 'react'
import styled from 'styled-components'

import constants from '../../../utils/constants.json'

const Div = styled.div`
  color: #c8e6c9;
  padding: 2px 8px 0 8px;
`

const TestdataMessage = ({ aeId }) => {
  const isTestArt = aeId && constants.testArten.includes(aeId)

  if (isTestArt) {
    return <Div>Das ist eine Test-Art. Sie können alles ausprobieren!</Div>
  }
  return null
}

export default TestdataMessage
