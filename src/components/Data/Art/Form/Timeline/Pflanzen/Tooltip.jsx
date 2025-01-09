import React from 'react'
import styled from '@emotion/styled'
import { DateTime } from 'luxon'

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
const Ereignis = styled.div`
  font-weight: 700;
`

export const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <Popup>
        <PTitle>
          <div>{DateTime.fromSQL(label).toFormat('yyyy.LL.dd')}</div>
          <Ereignis>{payload?.[0]?.payload?.title ?? ''}</Ereignis>
        </PTitle>
        {payload
          // Zählung and Prognose are only used for the optics,
          // do not want them in the tooltip
          ?.filter((p) => !['Zählung', 'Prognose'].includes(p.dataKey))
          ?.map((o) => {
            const label = o.dataKey
            const value =
              label === 'Auspflanzung' && Math.abs(o.value) ?
                Math.abs(o.value)
              : o.value

            return <PRow key={label}>{`${label}: ${value}`}</PRow>
          })}
      </Popup>
    )
  }

  return null
}
