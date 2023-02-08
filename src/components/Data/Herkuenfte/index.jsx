import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../storeContext'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import { ReactComponent as UpSvg } from '../../../svg/to_up.inline.svg'
import tableFilter from '../../../utils/tableFilter'
import herkunftSort from '../../../utils/herkunftSort'
import constants from '../../../utils/constants'

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
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const FieldsContainer = styled.div`
  height: 100%;
`

const Herkuenfte = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertHerkunftRev,
    sammlungIdInActiveNodeArray,
    artIdInActiveNodeArray,
    db,
    filter,
  } = store
  const {
    activeNodeArray: anaRaw,
    setActiveNodeArray,
    removeOpenNode,
  } = store.tree
  const activeNodeArray = anaRaw.toJSON()

  const [dataState, setDataState] = useState({ herkunfts: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = sammlungIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
        ]
      : artIdInActiveNodeArray
      ? [
          Q.experimentalNestedJoin('sammlung', 'art'),
          Q.on('sammlung', 'art_id', artIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('herkunft')
    const countObservable = collection
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.herkunft._deleted === false
              ? [false]
              : filter.herkunft._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        ...hierarchyQuery,
      )
      .observeCount()
    const herkunftsObservable = collection
      .query(...tableFilter({ store, table: 'herkunft' }), ...hierarchyQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const combinedObservables = combineLatest([
      countObservable,
      herkunftsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([totalCount, herkunfts]) =>
        setDataState({ herkunfts: herkunfts.sort(herkunftSort), totalCount }),
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    sammlungIdInActiveNodeArray,
    store,
    filter.herkunft._deleted,
    artIdInActiveNodeArray,
  ])

  const { herkunfts, totalCount } = dataState
  const filteredCount = herkunfts.length

  const add = useCallback(() => insertHerkunftRev(), [insertHerkunftRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Herkuenfte') {
    upTitle = 'Zu allen Listen'
  }

  // herkuenfte is top node
  // never enable adding below that
  const showPlus = activeNodeArray.length < 2

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <TitleContainer>
            <Title>Herkünfte</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              {showPlus && (
                <IconButton
                  aria-label="neue Herkunft"
                  title="neue Herkunft"
                  onClick={add}
                  size="large"
                >
                  <FaPlus />
                </IconButton>
              )}
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
              itemCount={herkunfts.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={herkunfts[index]}
                  last={index === herkunfts.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Herkuenfte))
