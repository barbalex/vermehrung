import React, { useContext, useCallback, useState, useEffect } from 'react'
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
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import FilterNumbers from '../../shared/FilterNumbers'
import exists from '../../../utils/exists'
import UpSvg from '../../../svg/to_up.svg?react'
import tableFilter from '../../../utils/tableFilter'
import lieferungSort from '../../../utils/lieferungSort'
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

const Lieferungen = ({ filter: showFilter = false, width, height }) => {
  const store = useContext(StoreContext)
  const {
    db,
    insertLieferungRev,
    kulturIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    filter,
  } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { lieferung: lieferungFilter } = store.filter

  const [dataState, setDataState] = useState({ lieferungs: [], totalCount: 0 })
  useEffect(() => {
    let kulturOnField = 'von_kultur_id'
    const hierarchyQuery = []
    if (kulturIdInActiveNodeArray) {
      const lastAnAElement = activeNodeArray[activeNodeArray.length - 1]
      if (lastAnAElement === 'An-Lieferungen') kulturOnField = 'nach_kultur_id'
      // this should get kulturen connected by von_kultur_id or nach_kultur_id
      // depending on activeNodeArray[last] being 'An-Lieferung' or 'Aus-Lieferung'
      // Q.on did not work because only one association can be declared per table
      hierarchyQuery.push(Q.where(kulturOnField, kulturIdInActiveNodeArray))
    }
    if (sammelLieferungIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['sammel_lieferung']))
      hierarchyQuery.push(
        Q.on('sammel_lieferung', 'id', sammelLieferungIdInActiveNodeArray),
      )
    }
    if (personIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['person']))
      hierarchyQuery.push(Q.on('person', 'id', personIdInActiveNodeArray))
    }
    if (sammlungIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['sammlung']))
      hierarchyQuery.push(Q.on('sammlung', 'id', sammlungIdInActiveNodeArray))
    }
    const collection = db.get('lieferung')
    const lieferungDelQuery =
      filter.lieferung._deleted === false
        ? Q.where('_deleted', false)
        : filter.lieferung._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const countObservable = collection
      .query(lieferungDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'lieferung',
          store,
        }),
        ...hierarchyQuery,
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, lieferungs]) => {
        setDataState({
          lieferungs: lieferungs.sort(lieferungSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of lieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(lieferungFilter),
    lieferungFilter,
    kulturIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    activeNodeArray,
    // need to rerender if last element of activeNodeArray changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    activeNodeArray[activeNodeArray.length - 1],
    store,
    filter.lieferung._deleted,
  ])

  const { lieferungs, totalCount } = dataState
  const filteredCount = lieferungs.length

  const add = useCallback(async () => {
    const isSammelLieferung =
      activeNodeArray.length >= 2 && activeNodeArray[0] === 'Sammel-Lieferungen'
    if (isSammelLieferung) {
      const slId = activeNodeArray[1]
      let sl
      try {
        sl = await db.get('sammel_lieferung').find(slId)
      } catch {}
      const additionalValuesToSet = {}

      const entries = Object.entries(sl)
        .filter(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) =>
            !key.startsWith('_') &&
            ![
              'lieferungs',
              'kulturByNachKulturId',
              'kulturByVonKulturId',
              'person',
              'sammlung',
            ].includes(key),
        )
        // eslint-disable-next-line no-unused-vars
        .filter(([key, value]) => exists(value))
      for (const [key, value] of entries) {
        const keyToUse = key === 'id' ? 'sammel_lieferung_id' : key
        additionalValuesToSet[keyToUse] = value
      }
      additionalValuesToSet.sammel_lieferung_id = slId
      return insertLieferungRev({
        values: additionalValuesToSet,
      })
    }
    insertLieferungRev()
  }, [activeNodeArray, db, insertLieferungRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Lieferungen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Sammlungen') {
    upTitle = 'Zur Sammlung'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Sammel-Lieferungen') {
    upTitle = 'Zur Sammel-Lieferung'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Lieferung"
                title="neue Lieferung"
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
              itemCount={lieferungs.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={lieferungs[index]}
                  last={index === lieferungs.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Lieferungen))
