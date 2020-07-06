import React, { useContext } from 'react'
import styled from 'styled-components'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../models/reactUtils'

const OuterContainer = styled.div`
  min-width: 48px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  font-weight: 500;
  min-height: 48px;
  justify-content: center;
  cursor: default;
  user-select: none;
`
const Filtered = styled.div`
  text-align: center;
`
const Total = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.54);
  text-align: center;
`

const FilterNumbers = ({ filteredNr, totalNr, asMenu }) => {
  const store = useContext(StoreContext)
  const { isFiltered: runIsFiltered, show } = store.filter
  const isFiltered = runIsFiltered()

  if (!(show || isFiltered)) return null

  if (asMenu) {
    return <MenuItem>{`${filteredNr}/${totalNr}`}</MenuItem>
  }

  return (
    <OuterContainer>
      <Container>
        <Filtered title="gefilterte Anzahl">{filteredNr}</Filtered>
        <Total title="totale Anzahl">{totalNr}</Total>
      </Container>
    </OuterContainer>
  )
}

export default FilterNumbers
