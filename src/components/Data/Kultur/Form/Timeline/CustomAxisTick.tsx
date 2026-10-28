import { DateTime } from 'luxon'

export const KulturCustomAxisTick = ({ x, y, payload }) => (
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
      {DateTime.fromMillis(payload.value).toFormat('yyyy.LL.dd')}
    </text>
  </g>
)

