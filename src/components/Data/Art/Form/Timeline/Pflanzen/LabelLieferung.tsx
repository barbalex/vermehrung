import { Text } from 'recharts'

export const LabelLieferung = ({
  x,
  y,
  stroke,
  value,
}: {
  x?: number
  y?: number
  stroke?: string
  value?: number
}) => {
  if (value === undefined) return null
  return (
    <Text
      x={x}
      y={y ?? 0}
      dy={(value ?? 0) > 0 ? -3 : 12}
      dx={5}
      fill={stroke ?? ''}
      fontSize={10}
      fontWeight={700}
      textAnchor="middle"
    >
      {value}
    </Text>
  )
}
