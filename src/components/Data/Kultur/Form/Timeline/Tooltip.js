import React from 'react'
import styled from '@emotion/styled'
import { DateTime } from 'luxon'

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
  font-weight: 700;
`
const Ereignis = styled.span`
  font-weight: 700;
  padding-left: 5px;
`

// somehow payload sometimes arrives as undefined, so set to []
const CustomTooltip = ({ payload: payloadPassed = [], label, active }) => {
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

  if (active && label && payloadPassed) {
    const ereignis = payload?.[0]?.payload?.ereignis ?? ''
    const title = DateTime.fromMillis(label).toFormat('yyyy.LL.dd')

    return (
      <Popup>
        <PTitle>
          {title}
          <Ereignis>{ereignis}</Ereignis>
        </PTitle>
        {payload?.map((o, i) => {
          // do not repeat Zählung/Lieferung all over the place
          const label = o.dataKey
            .replace('Zählung ', '')
            .replace('Lieferung ', '')
          // if this payload is last non summable values
          if (i === payload.length - 1) {
            return (
              <div key={`${o.dataKey}0`}>
                <PRow key={o.dataKey}>{`${label}: ${o.value}`}</PRow>
                {exists(o.payload['Lieferung Gramm Samen']) && (
                  <PRow
                    key={`${o.dataKey}1`}
                  >{`Gramm Samen: ${o.payload['Lieferung Gramm Samen']}`}</PRow>
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
                {exists(o.payload['Lieferung andere Mengen']) && (
                  <PRow
                    key={`${o.dataKey}3`}
                  >{`andere Mengen: ${o.payload['Lieferung andere Mengen']}`}</PRow>
                )}
                {exists(o.payload['Lieferung von Anzahl Individuen']) && (
                  <PRow
                    key={`${o.dataKey}4`}
                  >{`von Anzahl Individuen: ${o.payload['Lieferung von Anzahl Individuen']}`}</PRow>
                )}
                {exists(
                  o.payload['Zählung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <PRow
                    key={`${o.dataKey}5`}
                  >{`Beschreibung auspflanzbereite Pflanzen: ${o.payload['Zählung Beschreibung auspflanzbereite Pflanzen']}`}</PRow>
                )}
                {exists(
                  o.payload['Lieferung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <PRow
                    key={`${o.dataKey}6`}
                  >{`Beschreibung auspflanzbereite Pflanzen: ${o.payload['Lieferung Beschreibung auspflanzbereite Pflanzen']}`}</PRow>
                )}
                {exists(o.payload['Zählung Bemerkungen']) && (
                  <PRow
                    key={`${o.dataKey}7`}
                  >{`Bemerkungen: ${o.payload['Zählung Bemerkungen']}`}</PRow>
                )}
                {exists(o.payload['Lieferung Bemerkungen']) && (
                  <PRow
                    key={`${o.dataKey}8`}
                  >{`Bemerkungen: ${o.payload['Lieferung Bemerkungen']}`}</PRow>
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
