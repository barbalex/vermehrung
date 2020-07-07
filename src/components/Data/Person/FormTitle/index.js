import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import KontoMenu from './KontoMenu'
import exists from '../../../../utils/exists'
import UpSvg from '../../../../svg/to_up.inline.svg'
import SaDownSvg from '../../../../svg/to_sa_down.inline.svg'
import GaDownSvg from '../../../../svg/to_ga_down.inline.svg'
import LiDownSvg from '../../../../svg/to_li_down.inline.svg'

const TitleContainer = styled.div`
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
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const Person = ({ showFilter, row }) => {
  const store = useContext(StoreContext)

  const { personsSorted, personsFiltered, userPerson, setError } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const hierarchyFilter = () => {
    return true
  }

  const totalNr = personsSorted.filter(hierarchyFilter).length
  const filteredNr = personsFiltered.filter(hierarchyFilter).length

  const { user_role } = userPerson

  const nrCount = useMemo(() => {
    if (!exists(row?.nr)) return 0
    return personsSorted.filter((h) => h.nr === row.nr).length
  }, [personsSorted, row?.nr])
  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'person.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Personen eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToSammlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Sammlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToGaerten = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Gaerten']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )

  if (showFilter) {
    return (
      <FilterTitle
        title="Person"
        table="person"
        totalNr={totalNr}
        filteredNr={filteredNr}
      />
    )
  }

  return (
    <TitleContainer>
      <Title>Person</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        <IconButton title="Zu den Sammlungen" onClick={onClickToSammlungen}>
          <SaDownSvg />
        </IconButton>
        <IconButton title="Zu den Gärten" onClick={onClickToGaerten}>
          <GaDownSvg />
        </IconButton>
        <IconButton title="Zu den Lieferungen" onClick={onClickToLieferungen}>
          <LiDownSvg />
        </IconButton>
        <KontoMenu row={row} />
        {user_role === 'manager' && (
          <>
            <AddButton />
            <DeleteButton row={row} />
          </>
        )}
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(Person)
