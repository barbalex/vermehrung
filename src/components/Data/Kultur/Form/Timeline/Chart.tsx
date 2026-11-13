import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

import { KulturTooltip } from './Tooltip.tsx'
import { KulturLabelLieferung as LabelLieferung } from './LabelLieferung.tsx'
import { KulturLabelZaehlung as LabelZaehlung } from './LabelZaehlung.tsx'
import { KulturCustomAxisTick as AxisTick } from './CustomAxisTick.tsx'
import { exists } from '../../../../../utils/exists.ts'

// lazy boundary: recharts (389KB) must only load when the timeline is
// actually expanded - not when the form opens
export const KulturTimelineChart = ({
  allData,
  isNarrow,
}: {
  allData: Record<string, unknown>[]
  isNarrow: boolean
}) => {
  const showCategory = (category: string) =>
    !!allData.map((d) => d[category]).filter((d) => exists(d)).length

  return (
    <ResponsiveContainer
      width="99%"
      height={450}
    >
      <ComposedChart
        data={allData}
        margin={{ top: 15, right: 0, left: 0, bottom: 45 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
        />
        <XAxis
          dataKey="datum"
          tick={
            AxisTick as unknown as {
              value: unknown
              fill: string
            }
          }
          interval={0}
        />
        <YAxis
          label={{
            value: 'Anzahl',
            angle: -90,
            position: 'insideLeft',
            offset: 25,
            fontSize: 12,
          }}
          fontSize={12}
        />
        <Tooltip content={<KulturTooltip />} />
        {isNarrow ?
          <Legend
            layout="horizontal"
            align="center"
            wrapperStyle={{ bottom: 0, fontSize: 12 }}
          />
        : <Legend
            layout="vertical"
            align="right"
            wrapperStyle={{ right: -10, top: 50, fontSize: 12 }}
          />
        }
        <ReferenceLine
          y={0}
          stroke="#000"
        />
        {showCategory('Lieferung Pflanzen') && (
          <Bar
            dataKey="Lieferung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Lieferung Pflanzen geplant') && (
          <Bar
            dataKey="Lieferung Pflanzen geplant"
            fill="#ceceeb"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Lieferung Pflanzen geplant, ignoriert') && (
          <Bar
            dataKey="Lieferung Pflanzen geplant, ignoriert"
            fill="#ebebf9"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Lieferung Pflanzen auspflanzbereit') && (
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit"
            fill="#016526"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Lieferung Pflanzen auspflanzbereit geplant') && (
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant"
            fill="#9cffc0"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory(
          'Lieferung Pflanzen auspflanzbereit geplant, ignoriert',
        ) && (
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant, ignoriert"
            fill="#e6ffef"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Zählung Pflanzen') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen"
            stroke="#4a148c"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Pflanzen Bedarf') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen Bedarf"
            stroke="#e0e0ff"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Pflanzen Bedarf, ignoriert') && (
          <Line
            type="basis"
            dataKey="Pflanzen Bedarf, ignoriert"
            legendType="circle"
            stroke="#ebebf9"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Zählung Pflanzen auspflanzbereit') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit"
            stroke="#016526"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Pflanzen auspflanzbereit Bedarf') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen auspflanzbereit Bedarf"
            stroke="#9cffc0"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Pflanzen auspflanzbereit Bedarf, ignoriert') && (
          <Line
            type="basis"
            dataKey="Pflanzen auspflanzbereit Bedarf, ignoriert"
            legendType="circle"
            stroke="#e6ffef"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Zählung Mutterpflanzen') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen"
            stroke="#cc0000"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Mutterpflanzen Bedarf') && (
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Mutterpflanzen Bedarf"
            stroke="#ffb3b3"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
        {showCategory('Mutterpflanzen Bedarf, ignoriert') && (
          <Line
            type="basis"
            dataKey="Mutterpflanzen Bedarf, ignoriert"
            legendType="circle"
            stroke="#ffe6e6"
            strokeWidth={3}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
