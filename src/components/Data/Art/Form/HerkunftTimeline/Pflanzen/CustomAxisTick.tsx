import { DateTime } from 'luxon'

export const CustomAxisTick = ({ x, y, payload }: { x?: number; y?: number; payload?: Record<string, unknown> }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={4}
      textAnchor="end"
      fill="#666"
      transform="rotate(-90)"
      style={{ fontSize: 11 }}
    >
      {DateTime.fromSQL((payload?.value ?? '') as string).toFormat('yyyy.LL.dd')}
    </text>
  </g>
)
