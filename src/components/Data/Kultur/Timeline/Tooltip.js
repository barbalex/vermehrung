import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import exists from '../../../../utils/exists'

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

const CustomTooltip = ({ payload: payloadPassed, label, active }) => {
  // filter out zählung information if ereignis is not zählung
  const payload = [
    ...payloadPassed.filter(p => {
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
    return (
      <Popup>
        <PTitle>{moment(label).format('YYYY.MM.DD')}</PTitle>
        {payload.map((o, i) => {
          // if this payload is last non summable values
          if (i === payload.length - 1) {
            return (
              <div key={`${o.dataKey}0`}>
                <PRow key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</PRow>
                {exists(o.payload['Lieferung Gramm Samen']) && (
                  <PRow key={`${o.dataKey}1`}>{`Lieferung Gramm Samen: ${
                    o.payload['Lieferung Gramm Samen']
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung Ziel']) && (
                  <PRow key={`${o.dataKey}9`}>{`Zählung Ziel: ${
                    o.payload['Zählung Ziel']
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung Prognose']) && (
                  <PRow key={`${o.dataKey}10`}>{`Zählung Prognose: ${
                    o.payload['Zählung Prognose']
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung andere Mengen']) && (
                  <PRow key={`${o.dataKey}2`}>{`Zählung andere Mengen: ${
                    o.payload['Zählung andere Mengen']
                  }`}</PRow>
                )}
                {exists(o.payload['Lieferung andere Mengen']) && (
                  <PRow key={`${o.dataKey}3`}>{`Lieferung andere Mengen: ${
                    o.payload['Lieferung andere Mengen']
                  }`}</PRow>
                )}
                {exists(o.payload['Lieferung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`Lieferung von Anzahl Individuen: ${
                    o.payload['Lieferung von Anzahl Individuen']
                  }`}</PRow>
                )}
                {exists(
                  o.payload['Zählung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <PRow
                    key={`${o.dataKey}5`}
                  >{`Zählung Beschreibung auspflanzbereite Pflanzen: ${
                    o.payload['Zählung Beschreibung auspflanzbereite Pflanzen']
                  }`}</PRow>
                )}
                {exists(
                  o.payload['Lieferung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <PRow
                    key={`${o.dataKey}6`}
                  >{`Lieferung Beschreibung auspflanzbereite Pflanzen: ${
                    o.payload[
                      'Lieferung Beschreibung auspflanzbereite Pflanzen'
                    ]
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung Bemerkungen']) && (
                  <PRow key={`${o.dataKey}7`}>{`Zählung Bemerkungen: ${
                    o.payload['Zählung Bemerkungen']
                  }`}</PRow>
                )}
                {exists(o.payload['Lieferung Bemerkungen']) && (
                  <PRow key={`${o.dataKey}8`}>{`Lieferung Bemerkungen: ${
                    o.payload['Lieferung Bemerkungen']
                  }`}</PRow>
                )}
              </div>
            )
          }
          return <PRow key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</PRow>
        })}
      </Popup>
    )
  }

  return null
}

export default CustomTooltip
