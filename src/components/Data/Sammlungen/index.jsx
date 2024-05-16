import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../storeContext.js'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import FilterNumbers from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import tableFilter from '../../../utils/tableFilter'
import sammlungsSortedFromSammlungs from '../../../utils/sammlungsSortedFromSammlungs.js'
import constants from '../../../utils/constants.js'

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
  height: 100%;
`

const Sammlungen = ({ filter: showFilter = false, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertSammlungRev,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    db,
    filter,
  } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { sammlung: sammlungFilter } = store.filter

  const [dataState, setDataState] = useState({ sammlungs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = []
    if (artIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['art']))
      hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
    }
    if (herkunftIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
      hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
    }
    if (personIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['person']))
      hierarchyQuery.push(Q.on('person', 'id', personIdInActiveNodeArray))
    }
    const collection = db.get('sammlung')
    const sammlungDelQuery =
      filter.sammlung._deleted === false
        ? Q.where('_deleted', false)
        : filter.sammlung._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const countObservable = collection
      .query(sammlungDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'sammlung',
          store,
        }),
        ...hierarchyQuery,
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])

    // so need to hackily use merge
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, sammlungs]) => {
        const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
        setDataState({
          sammlungs: sammlungsSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of sammlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammlungFilter),

    sammlungFilter,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    store,
    filter.sammlung._deleted,
  ])

  const { sammlungs, totalCount } = dataState
  const filteredCount = sammlungs.length

  const add = useCallback(() => {
    insertSammlungRev()
  }, [insertSammlungRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammlungen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Arten') {
    upTitle = 'Zur Art'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Personen') {
    upTitle = 'Zur Person'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Herkuenfte') {
    upTitle = 'Zur Herkunft'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammlung"
                title="neue Sammlung"
                onClick={add}
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
        )}
        <FieldsContainer>
          {!!width && (
            <FixedSizeList
              height={height - constants.titleRowHeight}
              itemCount={sammlungs.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={sammlungs[index]}
                  last={index === sammlungs.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Sammlungen))
