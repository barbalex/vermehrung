import React from 'react'

const LabelZaehlung = ({ x, y, stroke, value }) => (
  <text x={x} y={y} dy={-5} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
)

export default LabelZaehlung
