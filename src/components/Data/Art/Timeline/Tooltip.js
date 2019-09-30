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

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <Popup>
        <PTitle>{moment(label).format('YYYY.MM.DD')}</PTitle>
        {payload.map((o, i) => {
          // if this payload is last non summable values
          if (i === payload.length - 1) {
            console.log('Payload:', payload)
            return (
              <div key={`${o.dataKey}0`}>
                <PRow key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</PRow>
                {exists(o.payload['Auspflanzung andere Mengen']) && (
                  <PRow key={`${o.dataKey}3`}>{`Auspflanzung andere Mengen: ${
                    o.payload['Auspflanzung andere Mengen']
                  }`}</PRow>
                )}
                {exists(o.payload['Auspflanzung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`Auspflanzung von Anzahl Individuen: ${
                    o.payload['Auspflanzung von Anzahl Individuen']
                  }`}</PRow>
                )}
                {exists(o.payload['Auspflanzung Gramm Samen']) && (
                  <PRow key={`${o.dataKey}1`}>{`Auspflanzung Gramm Samen: ${
                    o.payload['Auspflanzung Gramm Samen']
                  }`}</PRow>
                )}
                {exists(o.payload['Auspflanzung Bemerkungen']) && (
                  <PRow key={`${o.dataKey}8`}>{`Auspflanzung Bemerkungen: ${
                    o.payload['Auspflanzung Bemerkungen']
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung Anzahl Mutterpflanzen']) && (
                  <PRow
                    key={`${o.dataKey}2`}
                  >{`Zählung Anzahl Mutterpflanzen: ${
                    o.payload['Zählung Anzahl Mutterpflanzen']
                  }`}</PRow>
                )}
                {exists(o.payload['Zählung andere Mengen']) && (
                  <PRow key={`${o.dataKey}2`}>{`Zählung andere Mengen: ${
                    o.payload['Zählung andere Mengen']
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
                {exists(o.payload['Zählung Bemerkungen']) && (
                  <PRow key={`${o.dataKey}7`}>{`Zählung Bemerkungen: ${
                    o.payload['Zählung Bemerkungen']
                  }`}</PRow>
                )}
                {exists(o.payload['Sammlung andere Mengen']) && (
                  <PRow key={`${o.dataKey}3`}>{`Sammlung andere Mengen: ${
                    o.payload['Sammlung andere Mengen']
                  }`}</PRow>
                )}
                {exists(o.payload['Sammlung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`Sammlung von Anzahl Individuen: ${
                    o.payload['Sammlung von Anzahl Individuen']
                  }`}</PRow>
                )}
                {exists(o.payload['Sammlung Gramm Samen']) && (
                  <PRow key={`${o.dataKey}1`}>{`Sammlung Gramm Samen: ${
                    o.payload['Sammlung Gramm Samen']
                  }`}</PRow>
                )}
                {exists(o.payload['Sammlung Bemerkungen']) && (
                  <PRow key={`${o.dataKey}8`}>{`Sammlung Bemerkungen: ${
                    o.payload['Sammlung Bemerkungen']
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
