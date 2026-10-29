import { DateTime } from 'luxon'

export const KulturCustomAxisTick = ({ x, y, payload }: { x?: number; y?: number; payload?: Record<string, unknown> }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-35)"
      style={{ fontSize: 12 }}
    >
      {DateTime.fromMillis(Number((payload ?? { value: 0 }).value)).toFormat('yyyy.LL.dd')}
    </text>
  </g>
)
