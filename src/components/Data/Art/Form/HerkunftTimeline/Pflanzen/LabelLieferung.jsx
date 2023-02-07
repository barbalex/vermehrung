import React from 'react'
import { Text } from 'recharts'

const LabelLieferung = ({ x, y, stroke, value }) => {
  if (value === undefined) return null
  return (
    <Text
      x={x}
      y={y}
      dy={value > 0 ? -3 : 12}
      dx={5}
      fill={stroke}
      fontSize={10}
      fontWeight={700}
      textAnchor="middle"
    >
      {value}
    </Text>
  )
}

export default LabelLieferung
