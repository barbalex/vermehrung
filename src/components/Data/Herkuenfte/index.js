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

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedQuery from '../../../utils/notDeletedQuery'
import herkunftSort from '../../../utils/herkunftSort'
import tableFilter from '../../../utils/tableFilter'

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

const Herkuenfte = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertHerkunftRev, sammlungIdInActiveNodeArray, db } = store
  const { activeNodeArray: anaRaw, setActiveNodeArray } = store.tree
  const { herkunft: herkunftFilter } = store.filter
  const activeNodeArray = anaRaw.toJSON()

  const [herkunfts, setHerkunfts] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const hierarchyQuery = sammlungIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
        ]
      : []
    const collection = db.collections.get('herkunft')
    const countObservable = collection
      .query(notDeletedQuery)
      .observeCount(false)
    const dataObservable = collection
      .query(...tableFilter({ store, table: 'herkunft' }), ...hierarchyQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const allCollectionsObservable = merge(countObservable, dataObservable)
    const allSubscription = allCollectionsObservable.subscribe((result) => {
      if (Array.isArray(result)) {
        setHerkunfts(result.sort((a, b) => herkunftSort({ a, b })))
      } else if (!isNaN(result)) {
        setCount(result)
      }
    })

    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    sammlungIdInActiveNodeArray,
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(herkunftFilter),
    store,
  ])

  const totalNr = count
  const filteredNr = herkunfts.length

  const add = useCallback(() => insertHerkunftRev(), [insertHerkunftRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
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
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Herkünfte</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              {showPlus && (
                <IconButton
                  aria-label="neue Herkunft"
                  title="neue Herkunft"
                  onClick={add}
                >
                  <FaPlus />
                </IconButton>
              )}
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
                  itemCount={herkunfts.length}
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
                      row={herkunfts[index]}
                      last={index === herkunfts.length - 1}
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

export default withResizeDetector(observer(Herkuenfte))
