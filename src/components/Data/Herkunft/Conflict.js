import React from 'react'
import styled from 'styled-components'

import ConflictExplainer from '../../shared/ConflictExplainer'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
`

const Conflict = ({ rev }) => {
  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <ConflictExplainer name="Herkunft" />
      <div>{`Konflikt ${rev}`}</div>
    </Container>
  )
}

export default Conflict
