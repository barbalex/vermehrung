import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  font-weight: 500;
  min-height: 48px;
  justify-content: center;
  padding: 0 5px;
  cursor: default;
  user-select: none;
`
const Filtered = styled.div`
  text-align: center;
`
const Total = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.54);
`

const FilterNumbers = ({ filteredNr, totalNr }) => {
  return (
    <Container>
      <Filtered title="gefilterte Anzahl">{filteredNr}</Filtered>
      <Total title="totale Anzahl">{totalNr}</Total>
    </Container>
  )
}

export default FilterNumbers
