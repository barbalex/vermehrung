import { Text } from 'recharts'

export const KulturLabelZaehlung = ({ x, y, stroke, value }: { x?: number; y?: number; stroke?: string; value?: number }) => (
  <Text
    x={x}
    y={y ?? 0}
    dy={-5}
    fill={stroke ?? ''}
    fontSize={10}
    fontWeight={700}
    textAnchor="middle"
  >
    {value}
  </Text>
)
