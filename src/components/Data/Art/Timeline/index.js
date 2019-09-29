import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
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

  const zaehlungenDone = get(row, 'zaehlungsDone') || []
  //console.log('Art-Timeline, zaehlungenDone:', zaehlungenDone)
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0]
  //console.log('Art-Timeline, lastZaehlungDone:', lastZaehlungDone)
  const zaehlungenPlanned = get(row, 'zaehlungsPlanned') || []
  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlanned],
    'datum',
  )
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = useMemo(
    () =>
      zaehlungenDone.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen': l.anzahl_pflanzen || 0,
      })),
    [zaehlungenDone],
  )
  //console.log('Art-Timeline, zaehlungenDoneData:', zaehlungenDoneData)
  const zaehlungenPlannedData = useMemo(
    () =>
      [lastZaehlungDone, ...zaehlungenPlanned].map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen geplant': l.anzahl_pflanzen || 0,
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

  const sammlungenDone = get(row, 'sammlungsDone') || []
  const sammlungenPlanned = get(row, 'sammlungsPlanned') || []
  const sammlungenPlannedIgnored = useMemo(
    () =>
      sammlungenPlanned.filter(lg =>
        // check if more recent sammlungenDone exists
        sammlungenDone.some(lu => lu.datum >= lg.datum),
      ),
    [sammlungenDone, sammlungenPlanned],
  )
  const sammlungenPlannedIncluded = useMemo(
    () =>
      sammlungenPlanned.filter(
        lg => !sammlungenPlannedIgnored.map(l => l.id).includes(lg.id),
      ),
    [sammlungenPlannedIgnored, sammlungenPlanned],
  )
  const sammlungenForLine = sortBy(
    [...sammlungenDone, ...sammlungenPlannedIncluded],
    'datum',
  )
  const auspflanzungenDone = get(row, 'auspflanzungsDone') || []
  const auspflanzungenPlanned = get(row, 'auspflanzungsPlanned') || []
  const auspflanzungenPlannedIgnored = useMemo(
    () =>
      auspflanzungenPlanned.filter(lg =>
        // check if more recent auspflanzungenDone exists
        auspflanzungenDone.some(l => l.datum >= lg.datum),
      ),
    [auspflanzungenDone, auspflanzungenPlanned],
  )
  const auspflanzungenPlannedIncluded = useMemo(
    () =>
      auspflanzungenPlanned.filter(
        lg => !auspflanzungenPlannedIgnored.map(l => l.id).includes(lg.id),
      ),
    [auspflanzungenPlannedIgnored, auspflanzungenPlanned],
  )
  const auspflanzungenForLine = sortBy(
    [...auspflanzungenDone, ...auspflanzungenPlannedIncluded],
    'datum',
  )
  const sammlungenDoneData = useMemo(
    () =>
      sammlungenDone.map(l => {
        // 1. previous Zaehlung is basis
        // If none, pretend this is first zaehlung
        const previousZaehlung = zaehlungenForLineReversed.find(
          z => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
        }
        // 2. Summ all Sammlungen since
        const sammlungenSince = sammlungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const auspflanzungenSince = auspflanzungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        //console.log('Art-Timeline, sammlungenSince:', sammlungenSince)
        //console.log('Art-Timeline, auspflanzungenSince:', auspflanzungenSince)
        const sumAnzahlPflanzen =
          (previousZaehlung.anzahl_pflanzen || 0) +
          (sumBy(sammlungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(auspflanzungenSince, 'anzahl_pflanzen') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Sammlung Pflanzen': l.anzahl_pflanzen,
          'Sammlung andere Mengen': l.andere_menge,
          'Sammlung Gramm Samen': l.gramm_samen,
          'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
          'Sammlung Bemerkungen': l.bemerkungen,
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen + l.anzahl_pflanzen
        } else {
          data['Zählung Pflanzen geplant'] =
            sumAnzahlPflanzen + l.anzahl_pflanzen
        }
        return data
      }),
    [
      sammlungenDone,
      sammlungenForLine,
      auspflanzungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const auspflanzungenDoneData = useMemo(
    () =>
      auspflanzungenDone.map(l => {
        // 1. previous Zaehlung is basis. If none, take 0
        const previousZaehlung = zaehlungenForLineReversed.find(
          z => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
        }
        // 2. Summ all Lieferungen since
        const sammlungenSince = sammlungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const auspflanzungenSince = auspflanzungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (previousZaehlung.anzahl_pflanzen || 0) +
          (sumBy(sammlungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(auspflanzungenSince, 'anzahl_pflanzen') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Auspflanzung Pflanzen': -l.anzahl_pflanzen,
          'Auspflanzung andere Mengen': l.andere_menge,
          'Auspflanzung Gramm Samen': l.gramm_samen,
          'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
          'Auspflanzung Bemerkungen': l.bemerkungen,
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen - l.anzahl_pflanzen
        } else {
          data['Zählung Pflanzen geplant'] =
            sumAnzahlPflanzen - l.anzahl_pflanzen
        }
        return data
      }),
    [
      sammlungenForLine,
      auspflanzungenDone,
      auspflanzungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const sammlungenPlannedData = useMemo(
    () =>
      sammlungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Sammlung Pflanzen geplant': l.anzahl_pflanzen,
        'Sammlung andere Mengen': l.andere_menge,
        'Sammlung Gramm Samen': l.gramm_samen,
        'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
        'Sammlung Bemerkungen': l.bemerkungen,
      })),
    [sammlungenPlannedIncluded],
  )
  const sammlungenPlannedIgnoredData = useMemo(
    () =>
      sammlungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Sammlung Pflanzen geplant, ignoriert': l.anzahl_pflanzen,
        'Sammlung andere Mengen': l.andere_menge,
        'Sammlung Gramm Samen': l.gramm_samen,
        'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
        'Sammlung Bemerkungen': l.bemerkungen,
      })),
    [sammlungenPlannedIgnored],
  )
  const auspflanzungenPlannedData = useMemo(
    () =>
      auspflanzungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Auspflanzung Pflanzen geplant': -l.anzahl_pflanzen,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
      })),
    [auspflanzungenPlannedIncluded],
  )
  const auspflanzungenPlannedIgnoredData = useMemo(
    () =>
      auspflanzungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Auspflanzung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
      })),
    [auspflanzungenPlannedIgnored],
  )

  const allData = useMemo(
    () =>
      sortBy(
        [
          ...sammlungenDoneData,
          ...sammlungenPlannedData,
          ...sammlungenPlannedIgnoredData,
          ...auspflanzungenDoneData,
          ...auspflanzungenPlannedData,
          ...auspflanzungenPlannedIgnoredData,
          ...zaehlungenData,
        ],
        'datum',
      ),
    [
      sammlungenDoneData,
      sammlungenPlannedData,
      sammlungenPlannedIgnoredData,
      auspflanzungenDoneData,
      auspflanzungenPlannedData,
      auspflanzungenPlannedIgnoredData,
      zaehlungenData,
    ],
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
            dataKey="Sammlung Pflanzen geplant, ignoriert"
            fill="#ebebf9"
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
            dataKey="Auspflanzung Pflanzen geplant, ignoriert"
            fill="#ebebf9"
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
