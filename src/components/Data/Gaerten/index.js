import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { Q } from '@nozbe/watermelondb'
import { merge } from 'rxjs'
import sortBy from 'lodash/sortBy'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedQuery from '../../../utils/notDeletedQuery'
import queryFromFilter from '../../../utils/queryFromFilter'
import personFullname from '../../../utils/personFullname'
import gartensSortedFromGartens from '../../../utils/gartensSortedFromGartens'

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

const Gaerten = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertGartenRev, personIdInActiveNodeArray, db } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { garten: gartenFilter } = store.filter

  const [gartens, setGartens] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const filterQuery = queryFromFilter({
      table: 'garten',
      filter: gartenFilter.toJSON(),
    })
    const hierarchyQuery = personIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection = db.collections.get('garten')
    const countObservable = collection
      .query(notDeletedQuery)
      .observeCount(false)
    const dataObservable = collection
      .query(...filterQuery, ...hierarchyQuery)
      .observeWithColumns(['name', 'person_id'])
    const allCollectionsObservable = merge(countObservable, dataObservable)
    const allSubscription = allCollectionsObservable.subscribe(
      async (result) => {
        if (Array.isArray(result)) {
          const gartensSorted = await gartensSortedFromGartens(result)
          setGartens(gartensSorted)
        } else if (!isNaN(result)) {
          setCount(result)
        }
      },
    )

    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    personIdInActiveNodeArray,
    // need to rerender if any of the values of gartenFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(gartenFilter),
    gartenFilter,
  ])

  const totalNr = count
  const filteredNr = gartens.length

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
                  itemCount={gartens.length}
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
                      row={gartens[index]}
                      last={index === gartens.length - 1}
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
