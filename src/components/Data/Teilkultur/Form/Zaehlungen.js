import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../models/reactUtils'
import exists from '../../../../utils/exists'
import teilzaehlungsSortByTk from '../../../../utils/teilzaehlungsSortByTk'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  ${(props) => !props['data-has-data'] && 'margin-bottom: 10px;'}
  padding: 0 10px;
  user-select: none;
  position: sticky;
  top: -10px;
  z-index: 1;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Rows = styled.div``
const Row = styled.div`
  ${(props) =>
    !props['data-last'] && 'border-bottom: thin solid rgba(74, 20, 140, 0.1);'}
  border-collapse: collapse;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`
const Datum = styled.div`
  flex-basis: 85px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`
const Pflanzen = styled.div`
  flex-basis: 110px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`
const Auspflanzbereit = styled.div`
  flex-basis: 170px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`
const Prognose = styled.div`
  flex-basis: 72px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`
const Other = styled.div`
  flex-basis: 210px;
  flex-shrink: 5;
  flex-grow: 1;
  margin-right: 10px;
`

const TkZaehlungen = ({ kulturId, teilkulturId }) => {
  const store = useContext(StoreContext)
  const { db } = store

  const [teilzaehlungs, setTeilzaehlungs] = useState([])
  useEffect(() => {
    const run = async () => {
      const teilzaehlungs = await db.collections
        .get('teilzaehlung')
        // there should only be one tz per teilkultur_id
        .query(
          Q.where('_deleted', false),
          Q.where('teilkultur_id', teilkulturId),
          Q.on('zaehlung', Q.where('kultur_id', kulturId)),
        )
        .fetch()
      const teilzaehlungsSorted = await teilzaehlungsSortByTk(teilzaehlungs)
      setTeilzaehlungs(teilzaehlungsSorted)
    }
    run()
  }, [db.collections, kulturId, teilkulturId])

  return (
    <ErrorBoundary>
      <TitleRow data-has-data={!!teilzaehlungs.length}>
        <Title>Zählungen</Title>
      </TitleRow>
      <Rows>
        {teilzaehlungs.map((tz, i) => {
          const zaehlung = tz?.zaehlung_id
            ? store.zaehlungs.get(tz.zaehlung_id)
            : {}
          const datum = zaehlung?.datum
            ? format(new Date(zaehlung?.datum), 'yyyy.MM.dd')
            : 'Kein Datum'

          return (
            <Row key={tz.id} data-last={i === teilzaehlungs.length - 1}>
              <Datum>{datum}</Datum>
              <Prognose>{zaehlung.prognose ? 'Prognose' : ' '}</Prognose>
              <Pflanzen>
                {exists(tz.anzahl_pflanzen)
                  ? `${tz.anzahl_pflanzen} Pflanzen`
                  : ''}
              </Pflanzen>
              <Auspflanzbereit>
                {exists(tz.anzahl_auspflanzbereit)
                  ? `${tz.anzahl_auspflanzbereit} auspflanzbereit`
                  : ''}
              </Auspflanzbereit>
              <Auspflanzbereit>
                {exists(tz.anzahl_mutterpflanzen)
                  ? `${tz.anzahl_mutterpflanzen} Mutterpflanzen`
                  : ''}
              </Auspflanzbereit>
              <Auspflanzbereit>
                {exists(tz.andere_menge) ? tz.andere_menge : ''}
              </Auspflanzbereit>
              <Other>
                {exists(tz.auspflanzebereit_beschreibung)
                  ? tz.auspflanzebereit_beschreibung
                  : ''}
              </Other>
              <Other>{tz.bemerkungen ? tz.bemerkungen : ''}</Other>
            </Row>
          )
        })}
      </Rows>
    </ErrorBoundary>
  )
}

export default TkZaehlungen
