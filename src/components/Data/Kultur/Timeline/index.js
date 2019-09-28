import React, { useCallback } from 'react'
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

const Kultur = ({ row }) => {
  const openDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Benutzer/Zeitachse-Kultur',
      )
  }, [])

  const zaehlungenDone = get(row, 'zaehlungs') || []
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0]
  const zaehlungenPlanned = get(row, 'zaehlungsPlanned') || []
  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter(zg =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some(z => z.datum >= zg.datum),
  )
  const zaehlungPlannedIgnoredIds = zaehlungenPlannedIgnored.map(l => l.id)
  let zaehlungenPlannedIncluded = zaehlungenPlanned.filter(
    lg => !zaehlungPlannedIgnoredIds.includes(lg.id),
  )
  if (zaehlungenPlannedIncluded.length) {
    // need to add last zaehlung to zaehlungenPlannedIncluded to connect lines
    zaehlungenPlannedIncluded = [lastZaehlungDone, ...zaehlungenPlannedIncluded]
  }
  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlannedIncluded],
    'datum',
  )
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = zaehlungenDone.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
  const zaehlungenPlannedIncludedData = zaehlungenPlannedIncluded.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
  const zaehlungenPlannedIgnoredData = zaehlungenPlannedIgnored.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
  const zaehlungenDataGroupedByDatum = groupBy(
    [...zaehlungenDoneData, ...zaehlungenPlannedIncludedData],
    'datum',
  )
  const zaehlungenData = Object.entries(
    zaehlungenDataGroupedByDatum,
    // eslint-disable-next-line no-unused-vars
  ).map(([key, value]) => Object.assign({}, ...value))

  const anLieferungenDone = get(row, 'anLieferungs') || []
  const anLieferungenPlanned = get(row, 'anLieferungsPlanned') || []
  const anLieferungPlannedIgnored = anLieferungenPlanned.filter(lg =>
    // check if more recent anLieferungenDone exists
    anLieferungenDone.some(lu => lu.datum >= lg.datum),
  )
  const anLieferungPlannedIncluded = anLieferungenPlanned.filter(
    lg => !anLieferungPlannedIgnored.map(l => l.id).includes(lg.id),
  )
  const anLieferungenForLine = sortBy(
    [...anLieferungenDone, ...anLieferungPlannedIncluded],
    'datum',
  )
  const ausLieferungenDone = get(row, 'ausLieferungs') || []
  const ausLieferungenPlanned = get(row, 'ausLieferungsPlanned') || []
  const ausLieferungPlannedIgnored = ausLieferungenPlanned.filter(lg =>
    // check if more recent ausLieferungenDone exists
    ausLieferungenDone.some(l => l.datum >= lg.datum),
  )
  const ausLieferungPlannedIgnoredIds = ausLieferungPlannedIgnored.map(
    l => l.id,
  )
  const ausLieferungPlannedIncluded = ausLieferungenPlanned.filter(
    lg => !ausLieferungPlannedIgnoredIds.includes(lg.id),
  )
  const ausLieferungenForLine = sortBy(
    [...ausLieferungenDone, ...ausLieferungPlannedIncluded],
    'datum',
  )
  const anLieferungenDoneData = anLieferungenDone.map(l => {
    // 1. previous Zaehlung is basis
    // If none, pretend this is first zaehlung
    const previousZaehlung = zaehlungenForLineReversed.find(
      z => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenForLine.filter(
      a => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenForLine.filter(
      a => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const sumAnzahlPflanzen =
      (get(
        previousZaehlung,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ) || 0) +
      (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
    const sumAnzahlAuspflanzbereit =
      (get(
        previousZaehlung,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ) || 0) +
      (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

    const data = {
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen': l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
    }
    if (l.datum < lastZaehlungDone.datum) {
      data['Zählung Pflanzen'] = sumAnzahlPflanzen + l.anzahl_pflanzen
      data['Zählung Pflanzen auspflanzbereit'] =
        sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
    } else {
      data['Zählung Pflanzen geplant'] = sumAnzahlPflanzen + l.anzahl_pflanzen
      data['Zählung Pflanzen auspflanzbereit geplant'] =
        sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
    }
    return data
  })
  const ausLieferungenDoneData = ausLieferungenDone.map(l => {
    // 1. previous Zaehlung is basis. If none, take 0
    const previousZaehlung = zaehlungenForLineReversed.find(
      z => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenForLine.filter(
      a => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenForLine.filter(
      a => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const sumAnzahlPflanzen =
      (get(
        previousZaehlung,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ) || 0) +
      (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
    const sumAnzahlAuspflanzbereit =
      (get(
        previousZaehlung,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ) || 0) +
      (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

    const data = {
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen': -l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': -l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
    }
    if (l.datum < lastZaehlungDone.datum) {
      data['Zählung Pflanzen'] = sumAnzahlPflanzen - l.anzahl_pflanzen
      data['Zählung Pflanzen auspflanzbereit'] =
        sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
    } else {
      data['Zählung Pflanzen geplant'] = sumAnzahlPflanzen - l.anzahl_pflanzen
      data['Zählung Pflanzen auspflanzbereit geplant'] =
        sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
    }
    return data
  })
  const anLieferungenPlannedData = anLieferungPlannedIncluded.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const anLieferungenPlannedIgnoredData = anLieferungPlannedIgnored.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant, ignoriert': l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
      l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const ausLieferungenPlannedData = ausLieferungPlannedIncluded.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': -l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const ausLieferungenPlannedIgnoredData = ausLieferungPlannedIgnored.map(
    l => ({
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit geplant, ignoriert': -l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
    }),
  )

  const allData = sortBy(
    [
      ...anLieferungenDoneData,
      ...anLieferungenPlannedData,
      ...anLieferungenPlannedIgnoredData,
      ...ausLieferungenDoneData,
      ...ausLieferungenPlannedData,
      ...ausLieferungenPlannedIgnoredData,
      ...zaehlungenData,
      ...zaehlungenPlannedIgnoredData,
    ],
    'datum',
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
          margin={{ top: 5, right: 0, left: 0, bottom: 45 }}
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
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen"
            stroke="#4a148c"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen geplant"
            stroke="#d8d8f3"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen geplant, ignoriert"
            legendType="circle"
            stroke="#d8d8f3"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit"
            stroke="#01792D"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit geplant"
            stroke="#dbf0e3"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen auspflanzbereit geplant, ignoriert"
            legendType="circle"
            stroke="#dbf0e3"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen"
            stroke="#F91F3F"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen geplant"
            stroke="#FCAFBB"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Mutterpflanzen geplant, ignoriert"
            legendType="circle"
            stroke="#FCAFBB"
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant"
            fill="#d8d8f3"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant, ignoriert"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit"
            fill="#01792D"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant"
            fill="#dbf0e3"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant, ignoriert"
            fill="#707070"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

export default Kultur
