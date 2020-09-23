import React from 'react'
import { DateTime } from 'luxon'

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
      {DateTime.fromSQL(payload.value).toFormat('yyyy.LL.dd')}
    </text>
  </g>
)

export default CustomAxisTick
