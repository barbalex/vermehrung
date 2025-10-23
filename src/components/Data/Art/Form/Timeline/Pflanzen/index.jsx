/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
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
  Scatter,
} from 'recharts'
import { observer } from 'mobx-react-lite'
import { useResizeDetector } from 'react-resize-detector'
import styled from '@emotion/styled'

import { CustomTooltip } from './Tooltip.jsx'
import { LabelLieferung } from './LabelLieferung.jsx'
import { LabelZaehlung } from './LabelZaehlung.jsx'
import { CustomAxisTick } from './CustomAxisTick.jsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { buildData } from './buildData.js'

const NoData = styled.div`
  padding: 0 10px 10px 10px;
`
const Container = styled.div`
  width: 100%;
`

export const Pflanzen = observer(({ artId }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const { width, ref } = useResizeDetector()
  const isNarrow = width < 1100

  const [data, setData] = useState(null)
  useEffect(() => {
    let isActive = true
    buildData({ db, artId }).then((data) => {
      if (!isActive) return

      setData(data)
    })
    return () => {
      isActive = false
    }
  }, [artId, db])

  if (!data) return null

  if (data && !data.length) {
    return <NoData>Keine Daten verfügbar für Anzahl Pflanzen</NoData>
  }

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806

  // console.log('Pflanzen, data:', data)

  return (
    <Container ref={ref}>
      <ErrorBoundary>
        <ResponsiveContainer
          width="99%"
          height={450}
        >
          <ComposedChart
            data={data}
            margin={{ top: 35, right: 0, left: 0, bottom: 45 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
            />
            <XAxis
              dataKey="datum"
              tick={CustomAxisTick}
              interval={0}
            />
            <YAxis
              label={{
                value: 'Anzahl Pflanzen',
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                fontSize: 14,
                fontWeight: 700,
              }}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {isNarrow ?
              <Legend
                layout="horizontal"
                align="center"
                wrapperStyle={{ bottom: 0, fontSize: 12 }}
              />
            : <Legend
                layout="vertical"
                align="right"
                wrapperStyle={{ right: -10, bottom: 150, fontSize: 12 }}
              />
            }
            <ReferenceLine
              y={0}
              stroke="#000"
            />
            <Bar
              dataKey="Sammlung"
              fill="orange"
              label={<LabelLieferung />}
              isAnimationActive={false}
            />
            <Bar
              dataKey="Sammlung geplant"
              fill="yellow"
              label={<LabelLieferung />}
              isAnimationActive={false}
            />
            <Bar
              dataKey="Auspflanzung"
              fill="#016526"
              label={<LabelLieferung />}
              isAnimationActive={false}
            />
            <Bar
              dataKey="Auspflanzung geplant"
              fill="#9cffc0"
              label={<LabelLieferung />}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              connectNulls={true}
              dataKey="Anzahl berechnet"
              stroke="#4a148c"
              strokeWidth={3}
              label={<LabelZaehlung />}
              isAnimationActive={false}
              dot={false}
            />
            <Scatter
              dataKey="Zählung"
              stroke="#4a148c"
              fill="#4a148c"
              // fill white makes legend go completely white...
              //fill="white"
              strokeWidth={3}
              isAnimationActive={false}
            ></Scatter>
            <Scatter
              dataKey="Bedarf"
              stroke="#e0e0ff"
              fill="#e0e0ff"
              strokeWidth={3}
              isAnimationActive={false}
            ></Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </ErrorBoundary>
    </Container>
  )
})
