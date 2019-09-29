import React from 'react'

const LabelLieferung = ({ x, y, stroke, value }) => (
  <text
    x={x + 5}
    y={y}
    dy={value > 0 ? -3 : 12}
    fill={stroke}
    fontSize={10}
    textAnchor="middle"
  >
    {value}
  </text>
)

export default LabelLieferung
