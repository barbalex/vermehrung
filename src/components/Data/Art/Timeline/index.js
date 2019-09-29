/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
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
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react-lite'

import CustomTooltip from './Tooltip'
import LabelLieferung from './LabelLieferung'
import LabelZaehlung from './LabelZaehlung'
import CustomAxisTick from './CustomAxisTick'

const TitleRow = styled.div`
  background-color: rgba(74, 20, 140, 0.05);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  margin-top: ${props => (props['data-first'] ? '-10px' : 'unset')};
  padding: 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const ArtTimeline = ({ row }) => {
  const openDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Benutzer/Zeitachse-Kultur',
      )
  }, [])

  const artSums = row.artSums || []
  const zaehlungenDone = artSums.filter(
    s => s.action === 'zaehlung' && !s.geplant,
  )
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0]
  const zaehlungenPlanned = artSums.filter(
    s => s.action === 'zaehlung' && s.geplant,
  )
  const zaehlungenDoneData = useMemo(
    () =>
      zaehlungenDone.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen': l.sum_anzahl_pflanzen || 0,
      })),
    [zaehlungenDone],
  )
  const zaehlungenPlannedData = useMemo(
    () =>
      [lastZaehlungDone, ...zaehlungenPlanned].map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen geplant': l.sum_anzahl_pflanzen || 0,
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
        [`Sammlung Pflanzen${l.geplant ? ' geplant' : ''}`]: l.anzahl_pflanzen,
        'Sammlung Pflanzen geplant': l.anzahl_pflanzen,
        'Sammlung andere Mengen': l.andere_menge,
        'Sammlung Gramm Samen': l.gramm_samen,
        'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
        'Sammlung Bemerkungen': l.bemerkungen,
        [`Zählung Pflanzen${
          l.geplant ? ' geplant' : ''
        }`]: l.sum_anzahl_pflanzen,
      })),
    [sammlungen],
  )
  const auspflanzungen = artSums.filter(s => s.action === 'auspflanzung')
  const auspflanzungenData = useMemo(
    () =>
      auspflanzungen.map(l => ({
        datum: new Date(l.datum).getTime(),
        [`Auspflanzung Pflanzen${
          l.geplant ? ' geplant' : ''
        }`]: l.anzahl_pflanzen,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
        [`Zählung Pflanzen${
          l.geplant ? ' geplant' : ''
        }`]: l.sum_anzahl_pflanzen,
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

  if (!row) return null
  if (!allData.length) return null

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zeit-Achse</Title>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
        </div>
      </TitleRow>
      <ResponsiveContainer width="99%" height={450}>
        <ComposedChart
          data={allData}
          margin={{ top: 15, right: 0, left: 0, bottom: 45 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datum" tick={CustomAxisTick} />
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
          <Legend
            layout="vertical"
            align="right"
            wrapperStyle={{ right: -10, bottom: 12, fontSize: 12 }}
          />
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
            dataKey="Zählung Pflanzen geplant"
            stroke="#b1b1e7"
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
