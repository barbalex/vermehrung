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
const initialZaehlungState = { zaehlungs: [], zaehlungsFiltered: [] }

const Zaehlungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertZaehlungRev, kulturIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { zaehlung: zaehlungFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [zaehlungsState, setZaehlungState] = useState(initialZaehlungState)
  useEffect(() => {
    const collection = db.collections.get('zaehlung')
    const query = kulturIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['kultur']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('kultur', 'id', kulturIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query.observe().subscribe(async (zaehlungs) => {
      const zaehlungsFiltered = zaehlungs.filter((value) =>
        storeFilter({ value, filter: zaehlungFilter, table: 'zaehlung' }),
      )
      const zaehlungSorters = await Promise.all(
        zaehlungsFiltered.map(async (zaehlung) => {
          const datum = zaehlung.datum ?? ''
          const anzahlPflanzen = zaehlung.anzahl_pflanzen ?? ''
          const sort = [datum, anzahlPflanzen]

          return { id: zaehlung.id, sort }
        }),
      )
      const zaehlungsSorted = sortBy(
        zaehlungsFiltered,
        (zaehlung) => zaehlungSorters.find((s) => s.id === zaehlung.id).sort,
      )
      setZaehlungState({ zaehlungs, zaehlungsFiltered: zaehlungsSorted })
    })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of zaehlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(zaehlungFilter)])

  const { zaehlungs, zaehlungsFiltered } = zaehlungsState
  const totalNr = zaehlungs.length
  const filteredNr = zaehlungsFiltered.length

  const add = useCallback(() => {
    insertZaehlungRev()
  }, [insertZaehlungRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Zaehlungen') {
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
            title="Zählung"
            table="zaehlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Zählungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Zählung"
                title="neue Zählung"
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
                  itemCount={zaehlungsFiltered.length}
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
                      row={zaehlungsFiltered[index]}
                      last={index === zaehlungsFiltered.length - 1}
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

export default withResizeDetector(observer(Zaehlungen))
