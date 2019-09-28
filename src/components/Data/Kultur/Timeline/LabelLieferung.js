import React from 'react'

const LabelLieferung = ({ x, y, stroke, value }) => (
  <text x={x + 3} y={y} dy={12} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
)

export default LabelLieferung
