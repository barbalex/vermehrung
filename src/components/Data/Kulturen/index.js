import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'

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
const initialKulturState = { kulturs: [], kultursFiltered: [] }

const Kulturen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertKulturRev,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { kultur: kulturFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [kultursState, setKulturState] = useState(initialKulturState)
  useEffect(() => {
    const collection = db.collections.get('kultur')
    const query = gartenIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['garten']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('garten', 'id', gartenIdInActiveNodeArray),
          ),
        )
      : artIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['art']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('art', 'id', artIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query.observe().subscribe(async (kulturs) => {
      const kultursFiltered = kulturs.filter((value) =>
        storeFilter({ value, filter: kulturFilter, table: 'kultur' }),
      )
      const kulturSorters = await Promise.all(
        kultursFiltered.map(async (kultur) => {
          const label = await kultur.label.pipe(first$()).toPromise()
          return { id: kultur.id, label }
        }),
      )
      // TODO: use kulturSort?
      const kultursSorted = sortBy(
        kultursFiltered,
        (kultur) => kulturSorters.find((s) => s.id === kultur.id).label,
      )
      setKulturState({ kulturs, kultursFiltered: kultursSorted })
    })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of kulturFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(kulturFilter)])

  const { kulturs, kultursFiltered } = kultursState
  const totalNr = kulturs.length
  const filteredNr = kultursFiltered.length

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
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
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Kulturen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
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
                  itemCount={kultursFiltered.length}
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
                      row={kultursFiltered[index]}
                      last={index === kultursFiltered.length - 1}
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

export default withResizeDetector(observer(Kulturen))
