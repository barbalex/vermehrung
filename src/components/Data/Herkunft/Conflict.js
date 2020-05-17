import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
`

const Conflict = ({ rev }) => {
  return (
    <Container>
      <div>{`Konflikt ${rev}`}</div>
    </Container>
  )
}

export default Conflict
