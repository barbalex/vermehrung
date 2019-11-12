/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import ErrorBoundary from 'react-error-boundary'
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
import { observer } from 'mobx-react-lite'
import ReactResizeDetector from 'react-resize-detector'

import CustomTooltip from './Tooltip'
import LabelLieferung from './LabelLieferung'
import LabelZaehlung from './LabelZaehlung'
import CustomAxisTick from './CustomAxisTick'

const ArtTimeline = ({ artSums }) => {
  const [narrow, setNarrow] = useState(false)

  // zaehlungen data is special because it is
  // devided in two lines
  // THAT SHOULD BE CONNECTED
  // so need to divide data,
  // add last done zaehlung as first point to planned
  // and the recombine
  const zaehlungenDone = artSums.filter(
    s => s.action === 'zaehlung' && !s.geplant,
  )
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0] || {}
  const zaehlungenPlanned = artSums.filter(
    s => s.action === 'zaehlung' && s.geplant,
  )
  const zaehlungenDoneData = useMemo(
    () =>
      zaehlungenDone.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen': l.sum_anzahl_pflanzen,
        'Zählung Pflanzen auspflanzbereit': l.sum_anzahl_auspflanzbereit,
        ereignis: 'Zählung',
      })),
    [zaehlungenDone],
  )
  const zaehlungenPlannedData = useMemo(
    () =>
      [lastZaehlungDone, ...zaehlungenPlanned].map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen Ziel/Prognose': l.sum_anzahl_pflanzen,
        'Zählung Pflanzen auspflanzbereit Ziel/Prognose':
          l.sum_anzahl_auspflanzbereit,
        ereignis: 'Zählung',
      })),
    [lastZaehlungDone, zaehlungenPlanned],
  )
  const zaehlungenDataGroupedByDatum = useMemo(
    () => groupBy([...zaehlungenDoneData, ...zaehlungenPlannedData], 'datum'),
    [zaehlungenDoneData, zaehlungenPlannedData],
  )
  const zaehlungenData = useMemo(
    () =>
      Object.entries(
        zaehlungenDataGroupedByDatum,
        // eslint-disable-next-line no-unused-vars
      ).map(([key, value]) => Object.assign({}, ...value)),
    [zaehlungenDataGroupedByDatum],
  )

  const sammlungen = artSums.filter(s => s.action === 'sammlung')
  const sammlungenData = useMemo(
    () =>
      sammlungen.map(l => ({
        datum: new Date(l.datum).getTime(),
        [`Sammlung Pflanzen${l.geplant ? ' geplant' : ''}`]:
          l.anzahl_pflanzen || 0,
        'Sammlung andere Mengen': l.andere_menge,
        'Sammlung Gramm Samen': l.gramm_samen,
        'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
        'Sammlung Bemerkungen': l.bemerkungen,
        [`Zählung Pflanzen${
          l.geplant ? ' Ziel/Prognose' : ''
        }`]: l.sum_anzahl_pflanzen,
        [`Zählung Pflanzen auspflanzbereit${
          l.geplant ? ' Ziel/Prognose' : ''
        }`]: l.sum_anzahl_auspflanzbereit,
        ereignis: 'Sammlung',
      })),
    [sammlungen],
  )
  const auspflanzungen = artSums.filter(s => s.action === 'auspflanzung')
  const auspflanzungenData = useMemo(
    () =>
      auspflanzungen.map(l => ({
        datum: new Date(l.datum).getTime(),
        [`Auspflanzung Pflanzen${l.geplant ? ' geplant' : ''}`]:
          l.anzahl_pflanzen || 0,
        [`Auspflanzung Pflanzen auspflanzbereit${l.geplant ? ' geplant' : ''}`]:
          l.anzahl_auspflanzbereit || 0,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
        [`Zählung Pflanzen${
          l.geplant ? ' Ziel/Prognose' : ''
        }`]: l.sum_anzahl_pflanzen,
        [`Zählung Pflanzen auspflanzbereit${
          l.geplant ? ' Ziel/Prognose' : ''
        }`]: l.sum_anzahl_auspflanzbereit,
        ereignis: 'Auspflanzung',
      })),
    [auspflanzungen],
  )

  const allData = useMemo(
    () =>
      sortBy(
        [...sammlungenData, ...auspflanzungenData, ...zaehlungenData],
        'datum',
      ),
    [sammlungenData, auspflanzungenData, zaehlungenData],
  )

  const onResize = useCallback(
    width => {
      if (width < 1100 && !narrow) {
        setNarrow(true)
      }
      if (width > 1100 && narrow) {
        setNarrow(false)
      }
    },
    [narrow],
  )

  if (!allData.length) return null

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806

  return (
    <ErrorBoundary>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <ResponsiveContainer width="99%" height={450}>
        <ComposedChart
          data={allData}
          margin={{ top: 15, right: 0, left: 0, bottom: 45 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis dataKey="datum" tick={CustomAxisTick} interval={0} />
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
          <Tooltip content={<CustomTooltip />} />
          {narrow ? (
            <Legend
              layout="horizontal"
              align="center"
              wrapperStyle={{ bottom: 0, fontSize: 12 }}
            />
          ) : (
            <Legend
              layout="vertical"
              align="right"
              wrapperStyle={{ right: -10, bottom: 150, fontSize: 12 }}
            />
          )}
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="Sammlung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Sammlung Pflanzen geplant"
            fill="#b1b1e7"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Auspflanzung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Auspflanzung Pflanzen geplant"
            fill="#b1b1e7"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Auspflanzung Pflanzen auspflanzbereit"
            fill="#016526"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Auspflanzung Pflanzen auspflanzbereit geplant"
            fill="#02e355"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen"
            stroke="#4a148c"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen Ziel/Prognose"
            stroke="#b1b1e7"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit"
            stroke="#016526"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit Ziel/Prognose"
            stroke="#02e355"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

export default observer(ArtTimeline)
