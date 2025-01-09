import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import format from 'date-fns/format'

import { exists } from '../../../../../utils/exists.js'

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

export const TeilkulturTeilzaehlung = ({ tz, last }) => {
  const [zaehlung, setZaehlung] = useState([])

  useEffect(() => {
    const zaehlungObservable = tz.zaehlung.observe()
    const subscription = zaehlungObservable.subscribe((zaehlung) =>
      setZaehlung(zaehlung),
    )

    return () => subscription?.unsubscribe?.()
  }, [tz.zaehlung])

  const datum =
    zaehlung?.datum ?
      format(new Date(zaehlung?.datum), 'yyyy.MM.dd')
    : 'Kein Datum'

  return (
    <Row data-last={last}>
      <Datum>{datum}</Datum>
      <Prognose>{zaehlung.prognose ? 'Prognose' : ' '}</Prognose>
      <Pflanzen>
        {exists(tz.anzahl_pflanzen) ? `${tz.anzahl_pflanzen} Pflanzen` : ''}
      </Pflanzen>
      <Auspflanzbereit>
        {exists(tz.anzahl_auspflanzbereit) ?
          `${tz.anzahl_auspflanzbereit} auspflanzbereit`
        : ''}
      </Auspflanzbereit>
      <Auspflanzbereit>
        {exists(tz.anzahl_mutterpflanzen) ?
          `${tz.anzahl_mutterpflanzen} Mutterpflanzen`
        : ''}
      </Auspflanzbereit>
      <Auspflanzbereit>
        {exists(tz.andere_menge) ? tz.andere_menge : ''}
      </Auspflanzbereit>
      <Other>
        {exists(tz.auspflanzebereit_beschreibung) ?
          tz.auspflanzebereit_beschreibung
        : ''}
      </Other>
      <Other>{tz.bemerkungen ? tz.bemerkungen : ''}</Other>
    </Row>
  )
}
