import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import UpSvg from '../../../svg/to_up.inline.svg'
import SimpleBar from 'simplebar-react'
import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'
import { merge } from 'rxjs'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import queryFromFilter from '../../../utils/queryFromFilter'

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
const initialArtState = { arts: [], artsFiltered: [] }

const Arten = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertArtRev, db } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { art: artFilter } = store.filter

  // use object with two keys to only render once on setting
  const [artsState, setArtState] = useState(initialArtState)
  useEffect(() => {
    const artCollection = db.collections.get('art')
    const subscription = artCollection
      .query(...queryFromFilter({ table: 'art', filter: artFilter.toJSON() }))
      .observe()
      .subscribe(async (arts) => {
        console.log('Arten, useEffect, subscription', { arts })
        const artSorters = await Promise.all(
          arts.map(async (art) => {
            const label = await art.label.pipe(first$()).toPromise()
            return { id: art.id, label }
          }),
        )
        const artsSorted = sortBy(
          arts,
          (art) => artSorters.find((s) => s.id === art.id).label,
        )
        setArtState({ arts, artsFiltered: artsSorted })
      })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(artFilter)])

  const { arts, artsFiltered } = artsState
  const totalNr = arts.length
  const filteredNr = artsFiltered.length

  console.log('Arten', {
    artsFiltered,
    arts,
    artFilter: artFilter.toJSON(),
  })

  const add = useCallback(() => {
    insertArtRev()
  }, [insertArtRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Arten') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Art"
            table="art"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Arten</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
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
                  itemCount={artsFiltered.length}
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
                      row={artsFiltered[index]}
                      last={index === artsFiltered.length - 1}
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

export default withResizeDetector(observer(Arten))
