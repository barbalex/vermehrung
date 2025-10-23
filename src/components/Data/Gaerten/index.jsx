import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { GartenRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { gartensSortedFromGartens } from '../../../utils/gartensSortedFromGartens.js'
import { constants } from '../../../utils/constants.js'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`

const TitleContainer = styled.div`
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
  margin-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`

export const Gaerten = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertGartenRev, personIdInActiveNodeArray, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const [dataState, setDataState] = useState({ gartens: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery =
      personIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('garten')
    const delQuery =
      filter.garten._deleted === false ? Q.where('_deleted', false)
      : filter.garten._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const aktivQuery =
      filter.garten?.aktiv === true ? Q.where('aktiv', true)
      : filter.garten?.aktiv === false ? Q.where('aktiv', false)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const totalCountObservable = collection
      .query(delQuery, aktivQuery, ...hierarchyQuery)
      .observeCount()
    const gartenObservable = collection
      .query(...tableFilter({ store, table: 'garten' }), ...hierarchyQuery)
      .observeWithColumns(['name', 'person_id'])
    const combinedObservables = combineLatest([
      totalCountObservable,
      gartenObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, gartens]) => {
        const gartensSorted = await gartensSortedFromGartens(gartens)
        setDataState({
          gartens: gartensSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    personIdInActiveNodeArray,
    // need to rerender if any of the values of gartenFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(filter.garten),
    filter.garten,
    store,
  ])

  const { gartens, totalCount } = dataState
  const filteredCount = gartens.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Gaerten') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Personen') {
    upTitle = 'Zur Person'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ?
          <FilterTitle
            title="Garten"
            table="garten"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <TitleContainer>
            <Title>Gärten</Title>
            <TitleSymbols>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neuer Garten"
                title="neuer Garten"
                onClick={insertGartenRev}
                size="large"
              >
                <FaPlus />
              </IconButton>
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </TitleSymbols>
          </TitleContainer>
        }
        <FieldsContainer>
          <List
            rowComponent={Row}
            rowCount={gartens.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: gartens }}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
})
