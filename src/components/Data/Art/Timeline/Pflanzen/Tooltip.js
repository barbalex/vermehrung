import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

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

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <Popup>
        <PTitle>
          {moment(label).format('YYYY.MM.DD')}
          <Ereignis>{payload?.[0]?.payload?.title ?? ''}</Ereignis>
        </PTitle>
        {payload.map((o) => {
          const label = o.dataKey
          return <PRow key={label}>{`${label}: ${o.value}`}</PRow>
        })}
      </Popup>
    )
  }

  return null
}

export default CustomTooltip
