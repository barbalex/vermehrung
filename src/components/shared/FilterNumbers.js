import React from 'react'
import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import constants from '../../utils/constants'

const OuterContainer = styled.div`
  min-width: ${constants.titleRowHeight}px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  font-weight: 500;
  min-height: ${constants.titleRowHeight}px;
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
const StyledMenuItem = styled(MenuItem)`
  color: rgba(0, 0, 0, 0.54) !important;
`

const FilterNumbers = ({ filteredCount, totalCount, asMenu }) => {
  if (asMenu) {
    return (
      <StyledMenuItem dense>
        <span title="gefilterte Anzahl">{filteredCount}</span>/
        <span title="totale Anzahl">{totalCount}</span>
      </StyledMenuItem>
    )
  }

  return (
    <OuterContainer>
      <Container>
        <Filtered title="gefilterte Anzahl">{filteredCount}</Filtered>
        <Total title="totale Anzahl">{totalCount}</Total>
      </Container>
    </OuterContainer>
  )
}

export default FilterNumbers
