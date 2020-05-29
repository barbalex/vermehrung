import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import exists from '../../../../../utils/exists'

const Popup = styled.div`
  background-color: white;
  border: 1px solid rgba(74, 20, 140, 0.9);
  opacity: 0.8;
  padding: 8px;
`
const PRow = styled.div`
  font-size: 0.8em;
  font-weight: 400;
`
const PTitle = styled.div`
  font-size: 0.8em;
  font-weight: 800;
`
const Ereignis = styled.span`
  font-weight: 600;
  padding-left: 5px;
`

const CustomTooltip = ({ payload: payloadPassed, label, active }) => {
  // filter out zählung information if ereignis is not zählung
  const payload = [
    ...payloadPassed.filter((p) => {
      if (
        p.payload.ereignis !== 'Zählung' &&
        p.dataKey.includes('Zählung Pflanzen')
      ) {
        return false
      }
      return true
    }),
  ]

  if (active) {
    const ereignis = payload?.[0]?.payload?.ereignis ?? ''

    return (
      <Popup>
        <PTitle>
          {moment(label).format('YYYY.MM.DD')}
          <Ereignis>{ereignis}</Ereignis>
        </PTitle>
        {payload.map((o, i) => {
          // do not repeat Zählung/Lieferung all over the place
          const label = o.dataKey
            .replace('Zählung ', '')
            .replace('Sammlung ', '')
            .replace('Auspflanzung ', '')
          // if this payload is last, add non summable values
          if (i === payload.length - 1) {
            return (
              <div key={`${o.dataKey}0`}>
                <PRow key={o.dataKey}>{`${label}: ${o.value}`}</PRow>
                {exists(o.payload['Auspflanzung andere Mengen']) && (
                  <PRow
                    key={`${o.dataKey}3`}
                  >{`andere Mengen: ${o.payload['Auspflanzung andere Mengen']}`}</PRow>
                )}
                {exists(o.payload['Auspflanzung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`von Anzahl Individuen: ${o.payload['Auspflanzung von Anzahl Individuen']}`}</PRow>
                )}
                {exists(o.payload['Auspflanzung Gramm Samen']) && (
                  <PRow
                    key={`${o.dataKey}1`}
                  >{`Gramm Samen: ${o.payload['Auspflanzung Gramm Samen']}`}</PRow>
                )}
                {exists(o.payload['Auspflanzung Bemerkungen']) && (
                  <PRow
                    key={`${o.dataKey}8`}
                  >{`Bemerkungen: ${o.payload['Auspflanzung Bemerkungen']}`}</PRow>
                )}
                {exists(o.payload['Zählung Prognose']) && (
                  <PRow
                    key={`${o.dataKey}10`}
                  >{`Prognose: ${o.payload['Zählung Prognose']}`}</PRow>
                )}
                {exists(o.payload['Zählung andere Mengen']) && (
                  <PRow
                    key={`${o.dataKey}2`}
                  >{`andere Mengen: ${o.payload['Zählung andere Mengen']}`}</PRow>
                )}
                {exists(
                  o.payload['Zählung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <PRow
                    key={`${o.dataKey}5`}
                  >{`Zählung Beschreibung auspflanzbereite Pflanzen: ${o.payload['Beschreibung auspflanzbereite Pflanzen']}`}</PRow>
                )}
                {exists(o.payload['Zählung Bemerkungen']) && (
                  <PRow
                    key={`${o.dataKey}7`}
                  >{`Bemerkungen: ${o.payload['Zählung Bemerkungen']}`}</PRow>
                )}
                {exists(o.payload['Sammlung andere Mengen']) && (
                  <PRow
                    key={`${o.dataKey}3`}
                  >{`andere Mengen: ${o.payload['Sammlung andere Mengen']}`}</PRow>
                )}
                {exists(o.payload['Sammlung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`von Anzahl Individuen: ${o.payload['Sammlung von Anzahl Individuen']}`}</PRow>
                )}
                {exists(o.payload['Sammlung Gramm Samen']) && (
                  <PRow
                    key={`${o.dataKey}1`}
                  >{`Gramm Samen: ${o.payload['Sammlung Gramm Samen']}`}</PRow>
                )}
                {exists(o.payload['Sammlung Bemerkungen']) && (
                  <PRow
                    key={`${o.dataKey}8`}
                  >{`Bemerkungen: ${o.payload['Sammlung Bemerkungen']}`}</PRow>
                )}
              </div>
            )
          }
          return <PRow key={o.dataKey}>{`${label}: ${o.value}`}</PRow>
        })}
      </Popup>
    )
  }

  return null
}

export default CustomTooltip
