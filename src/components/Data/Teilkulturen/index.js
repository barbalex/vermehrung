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
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedQuery from '../../../utils/notDeletedQuery'
import queryFromFilter from '../../../utils/queryFromFilter'
import teilkulturSort from '../../../utils/teilkulturSort'

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

const Teilkulturen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertTeilkulturRev, kulturIdInActiveNodeArray, db } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { teilkultur: teilkulturFilter } = store.filter

  const [teilkulturs, setTeilkulturs] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const filterQuery = queryFromFilter({
      table: 'teilkultur',
      filter: teilkulturFilter.toJSON(),
    })
    const hierarchyQuery = kulturIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection = db.collections.get('teilkultur')
    const countObservable = collection
      .query(notDeletedQuery)
      .observeCount(false)
    const dataObservable = collection
      .query(...filterQuery, ...hierarchyQuery)
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const allCollectionsObservable = merge(countObservable, dataObservable)
    const allSubscription = allCollectionsObservable.subscribe((result) => {
      if (Array.isArray(result)) {
        setTeilkulturs(result.sort((a, b) => teilkulturSort({ a, b })))
      } else if (!isNaN(result)) {
        setCount(result)
      }
    })
    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    // need to rerender if any of the values of teilkulturFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(teilkulturFilter),
    teilkulturFilter,
    kulturIdInActiveNodeArray,
  ])

  const totalNr = count
  const filteredNr = teilkulturs.length

  const add = useCallback(() => {
    insertTeilkulturRev()
  }, [insertTeilkulturRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Teilkulturen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Teilkulturen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Teilkultur"
                title="neue Teilkultur"
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
                  itemCount={teilkulturs.length}
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
                      row={teilkulturs[index]}
                      last={index === teilkulturs.length - 1}
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

export default withResizeDetector(observer(Teilkulturen))
