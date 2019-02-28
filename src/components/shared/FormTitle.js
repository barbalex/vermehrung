import React, { useContext } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { MdDeleteSweep, MdFilterList } from 'react-icons/md'

import storeContext from '../../storeContext'

const Container = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  @media print {
    display: none !important;
  }
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  padding-left: 8px;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Symbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 5px;
`
const FilterNumbers = styled.div`
  padding-top: 11px;
  padding-right: 8px;
  cursor: default;
  user-select: none;
  padding-right: 5px;
`
const StyledIconButton = styled(IconButton)`
  cursor: pointer;
  pointer-events: auto;
  padding-top: 5px;
  font-size: 25px;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 5px;
`

const FormTitle = ({ title, table, rowsLength, rowsFilteredLength }) => {
  const store = useContext(storeContext)
  const { isFiltered, show } = store.filter

  return (
    <Container>
      <TitleRow>
        <Title>{title}</Title>
        {table && (
          <Symbols>
            {show &&
              (rowsFilteredLength || rowsFilteredLength === 0) &&
              rowsLength && (
                <FilterNumbers>{`${rowsFilteredLength}/${rowsLength}`}</FilterNumbers>
              )}
            {!show && (
              <StyledIconButton title={`${title ? title : 'Daten'} filtern`}>
                <MdFilterList />
              </StyledIconButton>
            )}
            {isFiltered && (
              <StyledIconButton title="Filter entfernen">
                <MdDeleteSweep />
              </StyledIconButton>
            )}
          </Symbols>
        )}
      </TitleRow>
    </Container>
  )
}

export default FormTitle
