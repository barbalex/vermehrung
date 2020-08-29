import React from 'react'
import { Text } from 'recharts'

const LabelLieferung = ({ x, y, stroke, value }) => (
  <Text
    x={x + 2}
    y={y}
    dy={value > 0 ? -3 : 12}
    fill={stroke}
    fontSize={10}
    fontWeight={700}
    textAnchor="middle"
  >
    {value}
  </Text>
)

export default LabelLieferung
