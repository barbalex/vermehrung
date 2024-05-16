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
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.svg?react'
import tableFilter from '../../../utils/tableFilter'
import kultursSortedFromKulturs from '../../../utils/kultursSortedFromKulturs.js'
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

const Kulturen = ({ filter: showFilter = false, width, height }) => {
  const store = useContext(StoreContext)
  const {
    artIdInActiveNodeArray,
    db,
    filter,
    gartenIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    insertKulturRev,
  } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { kultur: kulturFilter } = store.filter

  const [dataState, setDataState] = useState({ kulturs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = []
    if (gartenIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['garten']))
      hierarchyQuery.push(Q.on('garten', 'id', gartenIdInActiveNodeArray))
    }
    if (artIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['art']))
      hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
    }
    if (herkunftIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
      hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
    }
    const collection = db.get('kultur')
    const kulturDelQuery =
      filter.kultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const kulturAktivQuery =
      filter.kultur.aktiv === false
        ? Q.where('aktiv', false)
        : filter.kultur.aktiv === true
        ? Q.where('aktiv', true)
        : Q.or(
            Q.where('aktiv', false),
            Q.where('aktiv', true),
            Q.where('aktiv', null),
          )
    const countObservable = collection
      .query(kulturDelQuery, kulturAktivQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'kultur', store }), ...hierarchyQuery)
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, kulturs]) => {
        const kultursSorted = await kultursSortedFromKulturs(kulturs)
        setDataState({
          kulturs: kultursSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturFilter,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    store,
    filter.kultur._deleted,
    filter.kultur.aktiv,
    herkunftIdInActiveNodeArray,
  ])

  const { kulturs, totalCount } = dataState
  const filteredCount = kulturs.length

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Kulturen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Arten') {
    upTitle = 'Zur Art'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Gaerten') {
    upTitle = 'Zum Garten'
  }
  const add = useCallback(() => {
    insertKulturRev()
  }, [insertKulturRev])

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Kultur"
            table="kultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <TitleContainer>
            <Title>Kulturen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
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
              itemCount={kulturs.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={kulturs[index]}
                  last={index === kulturs.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Kulturen))
