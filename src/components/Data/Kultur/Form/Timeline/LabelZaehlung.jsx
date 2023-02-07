import React from 'react'
import { Text } from 'recharts'

const LabelZaehlung = ({ x, y, stroke, value }) => (
  <Text
    x={x}
    y={y}
    dy={-5}
    fill={stroke}
    fontSize={10}
    fontWeight={700}
    textAnchor="middle"
  >
    {value}
  </Text>
)

export default LabelZaehlung
