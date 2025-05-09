import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { FixedSizeList } from 'react-window'
import { useResizeDetector } from 'react-resize-detector'
import UpSvg from '../../../svg/to_up.svg?react'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { ArtRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import { tableFilter } from '../../../utils/tableFilter.js'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.js'
import { constants } from '../../../utils/constants.js'
import { ApFilter } from '../../shared/ApFilter.jsx'

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
const ApFilterContainer = styled.div`
  margin-top: -3px;
`

export const Arten = observer(({ filter: showFilter }) => {
  const store = useContext(MobxStoreContext)
  const { insertArtRev, db, filter, apFilter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { art: artFilter } = store.filter

  const { width, height, ref } = useResizeDetector()

  const [dataState, setDataState] = useState({ arts: [], totalCount: 0 })
  useEffect(() => {
    const collection = db.get('art')
    const delQuery =
      filter.art._deleted === false ? Q.where('_deleted', false)
      : filter.art._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const totalCountObservable = collection.query(delQuery).observeCount()
    const artsObservable = collection
      .query(...tableFilter({ store, table: 'art', apFilter }))
      .observeWithColumns(['ae_id', 'set', 'apflora_ap', 'apflora_av'])
    const combinedObservables = combineLatest([
      totalCountObservable,
      artsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, arts]) => {
        const artsSorted = await artsSortedFromArts(arts)
        setDataState({ arts: artsSorted, totalCount })
      },
    )

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, ...Object.values(artFilter), artFilter, store, apFilter])

  const { arts, totalCount } = dataState
  const filteredCount = arts.length

  const add = useCallback(() => {
    insertArtRev()
  }, [insertArtRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Arten') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container
        showfilter={showFilter}
        ref={ref}
      >
        {showFilter ?
          <FilterTitle
            title="Art"
            table="art"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <TitleContainer>
            <Title>Arten</Title>
            <TitleSymbols>
              <ApFilterContainer>
                <ApFilter />
              </ApFilterContainer>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Art"
                title="neue Art"
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
        }
        <FieldsContainer>
          {!!width && (
            <FixedSizeList
              height={height - 48}
              itemCount={arts.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={arts[index]}
                  last={index === arts.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
})
