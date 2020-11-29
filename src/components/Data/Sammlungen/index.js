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
import aeArtLabelFromAeArt from '../../../utils/artLabelFromAeArt'
import personFullname from '../../../utils/personFullname'

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
const initialSammlungState = { sammlungs: [], sammlungsFiltered: [] }

const Sammlungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    insertSammlungRev,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { sammlung: sammlungFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [sammlungsState, setSammlungState] = useState(initialSammlungState)
  useEffect(() => {
    const collection = db.collections.get('sammlung')
    const query = artIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['art']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('art', 'id', artIdInActiveNodeArray),
          ),
        )
      : herkunftIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['herkunft']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('herkunft', 'id', herkunftIdInActiveNodeArray),
          ),
        )
      : personIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['person']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('person', 'id', personIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query.observe().subscribe(async (sammlungs) => {
      const sammlungsFiltered = sammlungs.filter((value) =>
        storeFilter({ value, filter: sammlungFilter, table: 'sammlung' }),
      )
      const sammlungSorters = await Promise.all(
        sammlungsFiltered.map(async (sammlung) => {
          const datum = sammlung.datum ?? ''
          const herkunft = await sammlung.herkunft.fetch()
          const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
          const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
          const herkunftLokalname = herkunft?.lokalname
            ?.toString()
            ?.toLowerCase()
          const person = await sammlung.person.fetch()
          const fullname = personFullname(person)?.toString()?.toLowerCase()
          const art = await sammlung.art.fetch()
          const ae_art = art ? await art.ae_art.fetch() : undefined
          const aeArtLabel = aeArtLabelFromAeArt({ ae_art })
            ?.toString()
            ?.toLowerCase()
          const sort = [
            datum,
            herkunftNr,
            herkunftGemeinde,
            herkunftLokalname,
            fullname,
            aeArtLabel,
          ]

          return { id: sammlung.id, sort }
        }),
      )
      const sammlungsSorted = sortBy(
        sammlungsFiltered,
        (sammlung) => sammlungSorters.find((s) => s.id === sammlung.id).sort,
      )
      setSammlungState({ sammlungs, sammlungsFiltered: sammlungsSorted })
    })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of sammlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(sammlungFilter)])

  const { sammlungs, sammlungsFiltered } = sammlungsState
  const totalNr = sammlungs.length
  const filteredNr = sammlungsFiltered.length

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
                  itemCount={sammlungsFiltered.length}
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
                      row={sammlungsFiltered[index]}
                      last={index === sammlungsFiltered.length - 1}
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
