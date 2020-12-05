import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { Q } from '@nozbe/watermelondb'
import { merge } from 'rxjs'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import exists from '../../../utils/exists'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'
import queryFromFilter from '../../../utils/queryFromFilter'
import lieferungSort from '../../../utils/lieferungSort'

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
const FieldsContainer = styled.div`
  height: 100%;
`
const StyledList = styled(FixedSizeList)`
  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }
`

const singleRowHeight = 48
const initialLieferungState = { lieferungs: [], lieferungsFiltered: [] }

const Lieferungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    db,
    insertLieferungRev,
    kulturIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { lieferung: lieferungFilter } = store.filter

  // use object with two keys to only render once on setting
  const [lieferungsState, setLieferungState] = useState(initialLieferungState)
  useEffect(() => {
    const collection = db.collections.get('lieferung')
    const query = kulturIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['kultur']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('kultur', 'id', kulturIdInActiveNodeArray),
          ),
        )
      : sammelLieferungIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['sammel_lieferung']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('sammel_lieferung', 'id', sammelLieferungIdInActiveNodeArray),
          ),
        )
      : personIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['person']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('person', 'id', personIdInActiveNodeArray),
          ),
        )
      : sammlungIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['sammlung']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query.observe().subscribe(async (lieferungs) => {
      const lieferungsSorted = lieferungs
        .filter((value) =>
          storeFilter({ value, filter: lieferungFilter, table: 'lieferung' }),
        )
        .sort(lieferungSort)
      setLieferungState({ lieferungs, lieferungsFiltered: lieferungsSorted })
    })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of lieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(lieferungFilter)])

  const { lieferungs, lieferungsFiltered } = lieferungsState
  const totalNr = lieferungs.length
  const filteredNr = lieferungsFiltered.length

  const add = useCallback(() => {
    const isSammelLieferung =
      activeNodeArray.length >= 2 && activeNodeArray[0] === 'Sammel-Lieferungen'
    if (isSammelLieferung) {
      const slId = activeNodeArray[1]
      const sl = store.sammel_lieferungs.get(slId)
      let additionalValuesToSet = {}

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
  }, [activeNodeArray, insertLieferungRev, store.sammel_lieferungs])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
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
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Lieferung"
                title="neue Lieferung"
                onClick={add}
              >
                <FaPlus />
              </IconButton>
              <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          {!!width && (
            <SimpleBar style={{ maxHeight: height, height: height - 48 }}>
              {({ scrollableNodeRef, contentNodeRef }) => (
                <StyledList
                  height={height - 48}
                  itemCount={lieferungsFiltered.length}
                  itemSize={singleRowHeight}
                  width={width}
                  innerRef={contentNodeRef}
                  outerRef={scrollableNodeRef}
                >
                  {({ index, style }) => (
                    <Row
                      key={index}
                      style={style}
                      index={index}
                      row={lieferungsFiltered[index]}
                      last={index === lieferungsFiltered.length - 1}
                    />
                  )}
                </StyledList>
              )}
            </SimpleBar>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Lieferungen))
