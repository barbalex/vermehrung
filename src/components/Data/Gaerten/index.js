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

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'
import gartenSort from '../../../utils/gartenSort'

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
const initialGartenState = { gartens: [], gartensFiltered: [] }

const Gaerten = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertGartenRev, personIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { garten: gartenFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [gartensState, setGartenState] = useState(initialGartenState)
  useEffect(() => {
    const collection = db.collections.get('garten')
    const query = personIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['person']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('person', 'id', personIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
      .subscribe((gartens) => {
        const gartensFiltered = gartens
          .filter((value) =>
            storeFilter({ value, filter: gartenFilter, table: 'garten' }),
          )
          .sort(gartenSort)
        setGartenState({ gartens, gartensFiltered })
      })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of gartenFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    db.collections,
    personIdInActiveNodeArray,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(gartenFilter),
  ])

  const { gartens, gartensFiltered } = gartensState
  const totalNr = gartens.length
  const filteredNr = gartensFiltered.length

  const add = useCallback(() => {
    insertGartenRev()
  }, [insertGartenRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
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
        {showFilter ? (
          <FilterTitle
            title="Garten"
            table="garten"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Gärten</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neuer Garten"
                title="neuer Garten"
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
                  itemCount={gartensFiltered.length}
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
                      row={gartensFiltered[index]}
                      last={index === gartensFiltered.length - 1}
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

export default withResizeDetector(observer(Gaerten))
