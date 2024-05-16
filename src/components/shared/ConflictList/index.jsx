import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

import Conflict from './Conflict.jsx'

const Konflikte = styled.div`
  margin-bottom: 10px;
`

const ConflictList = ({ conflicts, activeConflict, setActiveConflict }) => (
  <Konflikte>
    {[...conflicts].sort().map((conflict) => (
      <Conflict
        key={conflict}
        conflict={conflict}
        activeConflict={activeConflict}
        setActiveConflict={setActiveConflict}
      />
    ))}
  </Konflikte>
)

export default observer(ConflictList)
