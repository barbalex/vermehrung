import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import exists from '../../../utils/exists'
import UpSvg from '../../../svg/to_up.inline.svg'

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
  overflow: auto !important;
  height: 100%;
`

const singleRowHeight = 48

const Lieferungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertLieferungRev,
    lieferungsSorted,
    lieferungsFiltered,
    kulturIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return e.von_kultur_id === kulturIdInActiveNodeArray
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return e.nach_kultur_id === kulturIdInActiveNodeArray
      }
    }
    if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.sammel_lieferung_id === sammelLieferungIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.person_id === personIdInActiveNodeArray
    }
    if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.von_sammlung_id === sammlungIdInActiveNodeArray
    }
    return true
  }

  const storeRowsFiltered = lieferungsFiltered.filter(hierarchyFilter)

  const totalNr = lieferungsSorted.filter(hierarchyFilter).length
  const filteredNr = lieferungsFiltered.filter(hierarchyFilter).length

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
              'lieferungs_aggregate',
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
            <FixedSizeList
              height={height - 48}
              itemCount={storeRowsFiltered.length}
              itemSize={singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={storeRowsFiltered[index]}
                  last={index === storeRowsFiltered.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Lieferungen))
