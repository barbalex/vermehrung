import React, { useContext } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

import { StoreContext } from '../../../../models/reactUtils'
import exists from '../../../../utils/exists'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
  user-select: none;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Rows = styled.div`
  overflow: auto !important;
`
const Row = styled.div`
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: ${(props) => (props['data-last'] ? '1px' : 'thin')} solid
    rgba(74, 20, 140, 0.1);
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
  const { teilzaehlungsSorted } = store

  // there should only be one tz per teilkultur_id
  const teilzaehlungs = teilzaehlungsSorted.filter((tz) => {
    const zaehlung = tz?.zaehlung_id ? store.zaehlungs.get(tz.zaehlung_id) : {}
    return zaehlung?.kultur_id === kulturId && tz.teilkultur_id === teilkulturId
  })

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zählungen</Title>
      </TitleRow>
      <Rows>
        {teilzaehlungs.map((tz, i) => {
          const zaehlung = tz?.zaehlung_id
            ? store.zaehlungs.get(tz.zaehlung_id)
            : {}

          return (
            <Row key={tz.id} data-last={i === teilzaehlungs.length - 1}>
              <Datum>{`${format(
                new Date(zaehlung?.datum),
                'yyyy.MM.dd',
              )}:`}</Datum>
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
