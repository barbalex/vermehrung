import React from 'react'
import moment from 'moment'

const CustomAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={4}
      textAnchor="end"
      fill="#666"
      transform="rotate(-90)"
      style={{ fontSize: 11 }}
    >
      {moment(payload.value).format('YYYY.MM.DD')}
    </text>
  </g>
)

export default CustomAxisTick
