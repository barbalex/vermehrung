import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../storeContext.js'
import FilterTitle from '../../shared/FilterTitle.jsx'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import FilterNumbers from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import tableFilter from '../../../utils/tableFilter'
import lieferungSort from '../../../utils/lieferungSort.js'
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

const SammelLieferungen = ({ filter: showFilter = false, width, height }) => {
  const store = useContext(StoreContext)
  const { insertSammelLieferungRev, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { sammel_lieferung: sammelLieferungFilter } = store.filter

  const [dataState, setDataState] = useState({
    sammelLieferungs: [],
    totalCount: 0,
  })
  useEffect(() => {
    const collection = db.get('sammel_lieferung')
    const sammelLieferungDelQuery =
      filter.sammel_lieferung._deleted === false
        ? Q.where('_deleted', false)
        : filter.sammel_lieferung._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const countObservable = collection
      .query(sammelLieferungDelQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'sammel_lieferung',
          store,
        }),
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, sammelLieferungs]) => {
        setDataState({
          sammelLieferungs: sammelLieferungs.sort(lieferungSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of sammelLieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammelLieferungFilter),
    sammelLieferungFilter,
    store,
    filter.sammel_lieferung._deleted,
  ])

  const { sammelLieferungs, totalCount } = dataState
  const filteredCount = sammelLieferungs.length

  const add = useCallback(() => {
    insertSammelLieferungRev()
  }, [insertSammelLieferungRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammel-Lieferungen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <TitleContainer>
            <Title>Sammel-Lieferungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
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
              itemCount={sammelLieferungs.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={sammelLieferungs[index]}
                  last={index === sammelLieferungs.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(SammelLieferungen))
