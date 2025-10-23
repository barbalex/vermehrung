import { Text } from 'recharts'

export const LabelZaehlung = ({ x, y, stroke, value }) => {
  if (value === undefined) return null
  return (
    <Text
      x={x}
      y={y}
      dy={-20}
      dx={3}
      angle={-90}
      fill={stroke}
      fontSize={10}
      fontWeight={700}
      textAnchor="middle"
    >
      {value}
    </Text>
  )
}
