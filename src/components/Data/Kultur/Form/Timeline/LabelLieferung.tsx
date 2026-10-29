import { Text } from 'recharts'

export const KulturLabelLieferung = ({ x, y, stroke, value }: { x?: number; y?: number; stroke?: string; value?: number }) => (
  <Text
    x={(x ?? 0) + 2}
    y={y ?? 0}
    dy={(value ?? 0) > 0 ? -3 : 12}
    fill={stroke ?? ''}
    fontSize={10}
    fontWeight={700}
    textAnchor="middle"
  >
    {value}
  </Text>
)
