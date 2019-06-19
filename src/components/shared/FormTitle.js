import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { MdDeleteSweep, MdFilterList } from 'react-icons/md'

import storeContext from '../../storeContext'

const Container = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Symbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const FilterNumbers = styled.div`
  padding-right: 8px;
  cursor: default;
  user-select: none;
  padding-right: 5px;
  margin-top: auto;
  margin-bottom: auto;
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

const FormTitle = ({
  title,
  table,
  rowsLength,
  rowsFilteredLength,
  filter,
}) => {
  const store = useContext(storeContext)
  const { isFiltered: runIsFiltered, show, setShow, empty } = store.filter
  const isFiltered = runIsFiltered()
  const onClickFilter = useCallback(() => setShow(!show))
  const onClickEmpty = useCallback(() => empty())

  const titleText = filter ? `${title} Filter` : title

  return (
    <Container>
      <Title>{titleText}</Title>
      {table && (
        <Symbols>
          {(show || isFiltered) && (
            <FilterNumbers>{`${rowsFilteredLength}/${rowsLength}`}</FilterNumbers>
          )}
          <StyledIconButton
            title={`${show ? 'Daten bearbeiten' : 'Daten filtern'}`}
            onClick={onClickFilter}
          >
            <MdFilterList />
          </StyledIconButton>
          {isFiltered && (
            <StyledIconButton title="Filter entfernen" onClick={onClickEmpty}>
              <MdDeleteSweep />
            </StyledIconButton>
          )}
        </Symbols>
      )}
    </Container>
  )
}

export default FormTitle
