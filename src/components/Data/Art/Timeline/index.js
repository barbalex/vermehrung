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
  console.log('Art-Timeline, zaehlungenDone:', zaehlungenDone)
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0]
  console.log('Art-Timeline, lastZaehlungDone:', lastZaehlungDone)
  const zaehlungenPlanned = get(row, 'zaehlungsPlanned') || []
  console.log('Art-Timeline, zaehlungenPlanned:', zaehlungenPlanned)
  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter(zg =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some(z => z.datum >= zg.datum),
  )
  console.log(
    'Art-Timeline, zaehlungenPlannedIgnored:',
    zaehlungenPlannedIgnored,
  )
  const zaehlungenPlannedIncluded = useMemo(() => {
    let val = zaehlungenPlanned.filter(
      lg =>
        !zaehlungenPlannedIgnored
          .map(l => l.zaehlung_id)
          .includes(lg.zaehlung_id),
    )
    console.log('Art-Timeline, val:', val)
    if (val.length) {
      // need to add last zaehlung to zaehlungenPlannedIncluded to connect lines
      val = [lastZaehlungDone, ...val]
    }
    return val
  }, [lastZaehlungDone, zaehlungenPlanned, zaehlungenPlannedIgnored])
  console.log(
    'Art-Timeline, zaehlungenPlannedIncluded:',
    zaehlungenPlannedIncluded,
  )
  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlannedIncluded],
    'datum',
  )
  console.log('Art-Timeline, zaehlungenForLine:', zaehlungenForLine)
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = useMemo(
    () =>
      zaehlungenDone.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen': l.anzahl_pflanzen || 0,
        'Zählung Pflanzen auspflanzbereit': l.anzahl_auspflanzbereit || 0,
      })),
    [zaehlungenDone],
  )
  console.log('Art-Timeline, zaehlungenDoneData:', zaehlungenDoneData)
  const zaehlungenPlannedIncludedData = useMemo(
    () =>
      zaehlungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen geplant': l.anzahl_pflanzen || 0,
        'Zählung Pflanzen auspflanzbereit geplant':
          l.anzahl_auspflanzbereit || 0,
      })),
    [zaehlungenPlannedIncluded],
  )
  const zaehlungenPlannedIgnoredData = useMemo(
    () =>
      zaehlungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Zählung Pflanzen geplant, ignoriert': l.anzahl_pflanzen || 0,
        'Zählung Pflanzen auspflanzbereit geplant, ignoriert':
          l.anzahl_auspflanzbereit || 0,
      })),
    [zaehlungenPlannedIgnored],
  )
  const zaehlungenDataGroupedByDatum = useMemo(
    () =>
      groupBy(
        [...zaehlungenDoneData, ...zaehlungenPlannedIncludedData],
        'datum',
      ),
    [zaehlungenDoneData, zaehlungenPlannedIncludedData],
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
  const lieferungenDone = get(row, 'lieferungsDone') || []
  const lieferungenPlanned = get(row, 'lieferungsPlanned') || []
  const lieferungenPlannedIgnored = useMemo(
    () =>
      lieferungenPlanned.filter(lg =>
        // check if more recent lieferungenDone exists
        lieferungenDone.some(l => l.datum >= lg.datum),
      ),
    [lieferungenDone, lieferungenPlanned],
  )
  const lieferungenPlannedIncluded = useMemo(
    () =>
      lieferungenPlanned.filter(
        lg => !lieferungenPlannedIgnored.map(l => l.id).includes(lg.id),
      ),
    [lieferungenPlannedIgnored, lieferungenPlanned],
  )
  const lieferungenForLine = sortBy(
    [...lieferungenDone, ...lieferungenPlannedIncluded],
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
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Sammlungen since
        const sammlungenSince = sammlungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const lieferungenSince = lieferungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (get(
            previousZaehlung,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
          ) || 0) +
          (sumBy(sammlungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(lieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (get(
            previousZaehlung,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
          ) || 0) +
          (sumBy(sammlungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(lieferungenSince, 'anzahl_auspflanzbereit') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Sammlung Pflanzen': l.anzahl_pflanzen,
          'Sammlung Pflanzen auspflanzbereit': l.anzahl_auspflanzbereit,
          'Sammlung andere Mengen': l.andere_menge,
          'Sammlung Gramm Samen': l.gramm_samen,
          'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
          'Sammlung Bemerkungen': l.bemerkungen,
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen + l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
        } else {
          data['Zählung Pflanzen geplant'] =
            sumAnzahlPflanzen + l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit geplant'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
        }
        return data
      }),
    [
      sammlungenDone,
      sammlungenForLine,
      lieferungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const lieferungenDoneData = useMemo(
    () =>
      lieferungenDone.map(l => {
        // 1. previous Zaehlung is basis. If none, take 0
        const previousZaehlung = zaehlungenForLineReversed.find(
          z => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Lieferungen since
        const sammlungenSince = sammlungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const lieferungenSince = lieferungenForLine.filter(
          a => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (get(
            previousZaehlung,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
          ) || 0) +
          (sumBy(sammlungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(lieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (get(
            previousZaehlung,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
          ) || 0) +
          (sumBy(sammlungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(lieferungenSince, 'anzahl_auspflanzbereit') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Auspflanzung Pflanzen': -l.anzahl_pflanzen,
          'Auspflanzung Pflanzen auspflanzbereit': -l.anzahl_auspflanzbereit,
          'Auspflanzung andere Mengen': l.andere_menge,
          'Auspflanzung Gramm Samen': l.gramm_samen,
          'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
          'Auspflanzung Bemerkungen': l.bemerkungen,
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen - l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
        } else {
          data['Zählung Pflanzen geplant'] =
            sumAnzahlPflanzen - l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit geplant'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
        }
        return data
      }),
    [
      sammlungenForLine,
      lieferungenDone,
      lieferungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const sammlungenPlannedData = useMemo(
    () =>
      sammlungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Sammlung Pflanzen geplant': l.anzahl_pflanzen,
        'Sammlung Pflanzen auspflanzbereit geplant': l.anzahl_auspflanzbereit,
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
        'Sammlung Pflanzen auspflanzbereit geplant, ignoriert':
          l.anzahl_auspflanzbereit,
        'Sammlung andere Mengen': l.andere_menge,
        'Sammlung Gramm Samen': l.gramm_samen,
        'Sammlung von Anzahl Individuen': l.von_anzahl_individuen,
        'Sammlung Bemerkungen': l.bemerkungen,
      })),
    [sammlungenPlannedIgnored],
  )
  const lieferungenPlannedData = useMemo(
    () =>
      lieferungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Auspflanzung Pflanzen geplant': -l.anzahl_pflanzen,
        'Auspflanzung Pflanzen auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
      })),
    [lieferungenPlannedIncluded],
  )
  const lieferungenPlannedIgnoredData = useMemo(
    () =>
      lieferungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Auspflanzung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen,
        'Auspflanzung Pflanzen auspflanzbereit geplant, ignoriert': -l.anzahl_auspflanzbereit,
        'Auspflanzung andere Mengen': l.andere_menge,
        'Auspflanzung Gramm Samen': l.gramm_samen,
        'Auspflanzung von Anzahl Individuen': l.von_anzahl_individuen,
        'Auspflanzung Bemerkungen': l.bemerkungen,
      })),
    [lieferungenPlannedIgnored],
  )

  const allData = useMemo(
    () =>
      sortBy(
        [
          ...sammlungenDoneData,
          ...sammlungenPlannedData,
          ...sammlungenPlannedIgnoredData,
          ...lieferungenDoneData,
          ...lieferungenPlannedData,
          ...lieferungenPlannedIgnoredData,
          ...zaehlungenData,
          ...zaehlungenPlannedIgnoredData,
        ],
        'datum',
      ),
    [
      sammlungenDoneData,
      sammlungenPlannedData,
      sammlungenPlannedIgnoredData,
      lieferungenDoneData,
      lieferungenPlannedData,
      lieferungenPlannedIgnoredData,
      zaehlungenData,
      zaehlungenPlannedIgnoredData,
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
            dataKey="Sammlung Pflanzen auspflanzbereit"
            fill="#016526"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Sammlung Pflanzen auspflanzbereit geplant"
            fill="#02e355"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Sammlung Pflanzen auspflanzbereit geplant, ignoriert"
            fill="#e6ffef"
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
          <Bar
            dataKey="Auspflanzung Pflanzen auspflanzbereit geplant, ignoriert"
            fill="#e6ffef"
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
          <Line
            type="basis"
            dataKey="Zählung Pflanzen geplant, ignoriert"
            legendType="circle"
            stroke="#ebebf9"
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
            dataKey="Zählung Pflanzen auspflanzbereit geplant"
            stroke="#02e355"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen auspflanzbereit geplant, ignoriert"
            legendType="circle"
            stroke="#e6ffef"
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
