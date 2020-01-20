import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'
import format from 'date-fns/format'

import { teilzaehlung as teilzahlungFragment } from '../../../../utils/fragments'
import exists from '../../../../utils/exists'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
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
  border-bottom: ${props => (props['data-last'] ? '1px' : 'thin')} solid
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

const zaehlungQuery = gql`
  query zaehlungQueryForTkZaehlungen(
    $kulturId: bigint!
    $teilkulturId: bigint!
  ) {
    zaehlung(
      where: {
        kultur_id: { _eq: $kulturId }
        teilzaehlungs: { teilkultur_id: { _eq: $teilkulturId } }
      }
      order_by: { datum: desc_nulls_last }
    ) {
      id
      datum
      prognose
      teilzaehlungs {
        ...TeilzaehlungFields
      }
    }
  }
  ${teilzahlungFragment}
`

const TkZaehlungen = ({ kulturId, teilkulturId }) => {
  const { data, error, loading } = useQuery(zaehlungQuery, {
    variables: { kulturId, teilkulturId },
  })
  const rows = get(data, 'zaehlung', [])
  const tzs = rows.flatMap(row => {
    const tz = get(row, 'teilzaehlungs') || []
    return tz.map(t => ({
      ...t,
      datum: row.datum,
      prognose: row.prognose,
    }))
  })

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zählungen</Title>
      </TitleRow>
      <Rows>
        {loading
          ? 'lade...'
          : error
          ? error.message
          : tzs.map((tz, i) => (
              <Row key={tz.id} data-last={i === tzs.length - 1}>
                <Datum>{`${format(new Date(tz.datum), 'yyyy.MM.dd')}:`}</Datum>
                <Prognose>{tz.prognose ? 'Prognose' : ' '}</Prognose>
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
            ))}
      </Rows>
    </ErrorBoundary>
  )
}

export default TkZaehlungen
