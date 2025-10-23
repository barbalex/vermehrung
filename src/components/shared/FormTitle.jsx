import { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { constants } from '../../utils/constants.js'

const Container = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
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
  min-width: 48px;
  text-align: center;
`

const FormTitle = ({
  title,
  table,
  rowsLength,
  rowsFilteredLength,
  filter,
}) => {
  const store = useContext(StoreContext)
  const { filtered, show } = store.filter

  const titleText = filter ? `${title} Filter` : title

  return (
    <Container>
      <Title>{titleText}</Title>
      {table && (
        <Symbols>
          {(show || filtered) && (
            <FilterNumbers title="Anzahl gefiltert/total">{`${rowsFilteredLength}/${rowsLength}`}</FilterNumbers>
          )}
        </Symbols>
      )}
    </Container>
  )
}

export default observer(FormTitle)
