import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
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
const initialSammelLieferungState = {
  sammelLieferungs: [],
  sammelLieferungsFiltered: [],
}

const SammelLieferungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertSammelLieferungRev } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { sammel_lieferung: sammelLieferungFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [sammelLieferungsState, setSammelLieferungState] = useState(
    initialSammelLieferungState,
  )
  useEffect(() => {
    const subscription = db.collections
      .get('sammel_lieferung')
      .query(notDeletedOrHasConflictQuery)
      .observe()
      .subscribe(async (sammelLieferungs) => {
        const sammelLieferungsFiltered = sammelLieferungs.filter((value) =>
          storeFilter({
            value,
            filter: sammelLieferungFilter,
            table: 'sammel_lieferung',
          }),
        )
        const sammelLieferungSorters = await Promise.all(
          sammelLieferungsFiltered.map(async (sammelLieferung) => {
            const datum = sammelLieferung.datum ?? ''
            const anzahlPflanzen = sammelLieferung.anzahl_pflanzen ?? ''
            const sort = [datum, anzahlPflanzen]

            return { id: sammelLieferung.id, sort }
          }),
        )
        const sammelLieferungsSorted = sortBy(
          sammelLieferungsFiltered,
          (sammelLieferung) =>
            sammelLieferungSorters.find((s) => s.id === sammelLieferung.id)
              .sort,
        )
        setSammelLieferungState({
          sammelLieferungs,
          sammelLieferungsFiltered: sammelLieferungsSorted,
        })
      })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of sammelLieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(sammelLieferungFilter)])

  const { sammelLieferungs, sammelLieferungsFiltered } = sammelLieferungsState
  const totalNr = sammelLieferungs.length
  const filteredNr = sammelLieferungsFiltered.length

  const add = useCallback(() => {
    insertSammelLieferungRev()
  }, [insertSammelLieferungRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammel-Lieferungen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammel-Lieferungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
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
                  itemCount={sammelLieferungsFiltered.length}
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
                      row={sammelLieferungsFiltered[index]}
                      last={index === sammelLieferungsFiltered.length - 1}
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

export default withResizeDetector(observer(SammelLieferungen))
