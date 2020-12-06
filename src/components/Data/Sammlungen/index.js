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
import artLabelFromAeArt from '../../../utils/artLabelFromAeArt'
import personFullname from '../../../utils/personFullname'
import sammlungsSortedFromSammlungs from '../../../utils/sammlungsSortedFromSammlungs'

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

const Sammlungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertSammlungRev,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    db,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { sammlung: sammlungFilter } = store.filter

  const [sammlungs, setSammlungs] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const filterQuery = queryFromFilter({
      table: 'sammlung',
      filter: sammlungFilter.toJSON(),
    })
    const hierarchyQuery = artIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['art']),
          Q.on('art', 'id', artIdInActiveNodeArray),
        ]
      : herkunftIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['herkunft']),
          Q.on('herkunft', 'id', herkunftIdInActiveNodeArray),
        ]
      : personIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection = db.collections.get('sammlung')
    const countObservable = collection
      .query(notDeletedQuery)
      .observeCount(false)
    const dataObservable = collection
      .query(...filterQuery, ...hierarchyQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])

    // so need to hackily use merge
    const allCollectionsObservable = merge(countObservable, dataObservable)
    const allSubscription = allCollectionsObservable.subscribe(
      async (result) => {
        if (Array.isArray(result)) {
          const sammlungsSorted = await sammlungsSortedFromSammlungs(result)
          setSammlungs(sammlungsSorted)
        } else if (!isNaN(result)) {
          setCount(result)
        }
      },
    )

    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    // need to rerender if any of the values of sammlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammlungFilter),

    sammlungFilter,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
  ])

  const totalNr = count
  const filteredNr = sammlungs.length

  const add = useCallback(() => {
    insertSammlungRev()
  }, [insertSammlungRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammlungen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Arten') {
    upTitle = 'Zur Art'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Personen') {
    upTitle = 'Zur Person'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammlung"
                title="neue Sammlung"
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
                  itemCount={sammlungs.length}
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
                      row={sammlungs[index]}
                      last={index === sammlungs.length - 1}
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

export default withResizeDetector(observer(Sammlungen))
