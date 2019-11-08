import React, { useCallback, useMemo, useState } from 'react'
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
import ReactResizeDetector from 'react-resize-detector'

import CustomTooltip from './Tooltip'
import LabelLieferung from './LabelLieferung'
import LabelZaehlung from './LabelZaehlung'
import CustomAxisTick from './CustomAxisTick'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const KulturTimeline = ({ row }) => {
  const [narrow, setNarrow] = useState(false)

  const zaehlungenDone = get(row, 'zaehlungsDone') || []
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0] || {}
  const zaehlungenPlanned = get(row, 'zaehlungsPlanned') || []
  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter(zg =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some(z => z.datum >= zg.datum),
  )
  const zaehlungenPlannedIncluded = useMemo(() => {
    let val = zaehlungenPlanned.filter(
      lg => !zaehlungenPlannedIgnored.map(l => l.id).includes(lg.id),
    )
    if (val.length) {
      // need to add last zaehlung to zaehlungenPlannedIncluded to connect lines
      val = [lastZaehlungDone, ...val]
    }
    return val
  }, [lastZaehlungDone, zaehlungenPlanned, zaehlungenPlannedIgnored])
  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlannedIncluded],
    'datum',
  )
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = useMemo(
    () =>
      zaehlungenDone.map(l => {
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
          'Zählung Bemerkungen': teilzaehlungs
            .map(t => t.bemerkungen)
            .join(', '),
          ereignis: 'Zählung',
        }
      }),
    [zaehlungenDone],
  )
  const zaehlungenPlannedIncludedData = useMemo(
    () =>
      zaehlungenPlannedIncluded.map(l => {
        const teilzaehlungs = get(l, 'teilzaehlungs')

        return {
          datum: new Date(l.datum).getTime(),
          'Zählung Pflanzen Ziel/Prognose': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
          ),
          'Zählung Pflanzen auspflanzbereit Ziel/Prognose': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
          ),
          'Zählung Mutterpflanzen Ziel/Prognose': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
          ),
          'Zählung Ziel': teilzaehlungs
            .map(t => (t.ziel ? 'ja' : 'nein'))
            .join(', '),
          'Zählung Prognose': teilzaehlungs
            .map(t => (t.prognose ? 'ja' : 'nein'))
            .join(', '),
          'Zählung andere Mengen': teilzaehlungs
            .map(t => t.andere_menge)
            .join(', '),
          'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
            .map(t => t.auspflanzbereit_beschreibung)
            .join(', '),
          'Zählung Bemerkungen': teilzaehlungs
            .map(t => t.bemerkungen)
            .join(', '),
          ereignis: 'Zählung',
        }
      }),
    [zaehlungenPlannedIncluded],
  )
  const zaehlungenPlannedIgnoredData = useMemo(
    () =>
      zaehlungenPlannedIgnored.map(l => {
        const teilzaehlungs = get(l, 'teilzaehlungs')

        return {
          datum: new Date(l.datum).getTime(),
          'Zählung Pflanzen Ziel/Prognose, ignoriert': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
          ),
          'Zählung Pflanzen auspflanzbereit Ziel/Prognose, ignoriert': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
          ),
          'Zählung Mutterpflanzen Ziel/Prognose, ignoriert': get(
            l,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
          ),
          'Zählung Ziel': teilzaehlungs
            .map(t => (t.ziel ? 'ja' : 'nein'))
            .join(', '),
          'Zählung Prognose': teilzaehlungs
            .map(t => (t.prognose ? 'ja' : 'nein'))
            .join(', '),
          'Zählung andere Mengen': teilzaehlungs
            .map(t => t.andere_menge)
            .join(', '),
          'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
            .map(t => t.auspflanzbereit_beschreibung)
            .join(', '),
          'Zählung Bemerkungen': teilzaehlungs
            .map(t => t.bemerkungen)
            .join(', '),
          ereignis: 'Zählung',
        }
      }),
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

  const anLieferungenDone = get(row, 'anLieferungsDone') || []
  const anLieferungenPlanned = get(row, 'anLieferungsPlanned') || []
  const anLieferungenPlannedIgnored = useMemo(
    () =>
      anLieferungenPlanned.filter(lg =>
        // check if more recent anLieferungenDone exists
        anLieferungenDone.some(lu => lu.datum >= lg.datum),
      ),
    [anLieferungenDone, anLieferungenPlanned],
  )
  const anLieferungenPlannedIncluded = useMemo(
    () =>
      anLieferungenPlanned.filter(
        lg => !anLieferungenPlannedIgnored.map(l => l.id).includes(lg.id),
      ),
    [anLieferungenPlannedIgnored, anLieferungenPlanned],
  )
  const anLieferungenForLine = sortBy(
    [...anLieferungenDone, ...anLieferungenPlannedIncluded],
    'datum',
  )
  const ausLieferungenDone = get(row, 'ausLieferungsDone') || []
  const ausLieferungenPlanned = get(row, 'ausLieferungsPlanned') || []
  const ausLieferungenPlannedIgnored = useMemo(
    () =>
      ausLieferungenPlanned.filter(lg =>
        // check if more recent ausLieferungenDone exists
        ausLieferungenDone.some(l => l.datum >= lg.datum),
      ),
    [ausLieferungenDone, ausLieferungenPlanned],
  )
  const ausLieferungenPlannedIncluded = useMemo(
    () =>
      ausLieferungenPlanned.filter(
        lg => !ausLieferungenPlannedIgnored.map(l => l.id).includes(lg.id),
      ),
    [ausLieferungenPlannedIgnored, ausLieferungenPlanned],
  )
  const ausLieferungenForLine = sortBy(
    [...ausLieferungenDone, ...ausLieferungenPlannedIncluded],
    'datum',
  )
  const anLieferungenDoneData = useMemo(
    () =>
      anLieferungenDone.map(l => {
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
          ereignis: 'Lieferung',
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen + l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
        } else {
          data['Zählung Pflanzen Ziel/Prognose'] =
            sumAnzahlPflanzen + l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit Ziel/Prognose'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit
        }
        return data
      }),
    [
      anLieferungenDone,
      anLieferungenForLine,
      ausLieferungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const ausLieferungenDoneData = useMemo(
    () =>
      ausLieferungenDone.map(l => {
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
          ereignis: 'Lieferung',
        }
        if (l.datum < lastZaehlungDone.datum) {
          data['Zählung Pflanzen'] = sumAnzahlPflanzen - l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
        } else {
          data['Zählung Pflanzen Ziel/Prognose'] =
            sumAnzahlPflanzen - l.anzahl_pflanzen
          data['Zählung Pflanzen auspflanzbereit Ziel/Prognose'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit
        }
        return data
      }),
    [
      anLieferungenForLine,
      ausLieferungenDone,
      ausLieferungenForLine,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const anLieferungenPlannedData = useMemo(
    () =>
      anLieferungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant': l.anzahl_pflanzen,
        'Lieferung Pflanzen auspflanzbereit geplant': l.anzahl_auspflanzbereit,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      })),
    [anLieferungenPlannedIncluded],
  )
  const anLieferungenPlannedIgnoredData = useMemo(
    () =>
      anLieferungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant, ignoriert': l.anzahl_pflanzen,
        'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
          l.anzahl_auspflanzbereit,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      })),
    [anLieferungenPlannedIgnored],
  )
  const ausLieferungenPlannedData = useMemo(
    () =>
      ausLieferungenPlannedIncluded.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant': -l.anzahl_pflanzen,
        'Lieferung Pflanzen auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      })),
    [ausLieferungenPlannedIncluded],
  )
  const ausLieferungenPlannedIgnoredData = useMemo(
    () =>
      ausLieferungenPlannedIgnored.map(l => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen,
        'Lieferung Pflanzen auspflanzbereit geplant, ignoriert': -l.anzahl_auspflanzbereit,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      })),
    [ausLieferungenPlannedIgnored],
  )

  const allData = useMemo(
    () =>
      sortBy(
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
      ),
    [
      anLieferungenDoneData,
      anLieferungenPlannedData,
      anLieferungenPlannedIgnoredData,
      ausLieferungenDoneData,
      ausLieferungenPlannedData,
      ausLieferungenPlannedIgnoredData,
      zaehlungenData,
      zaehlungenPlannedIgnoredData,
    ],
  )
  const openDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Zeitachse-Kultur',
      )
  }, [])
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

  if (!row) return null
  if (!allData.length) return null

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806

  return (
    <ErrorBoundary>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
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
              wrapperStyle={{ right: -10, bottom: 12, fontSize: 12 }}
            />
          )}
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="Lieferung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant"
            fill="#b1b1e7"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant, ignoriert"
            fill="#ebebf9"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit"
            fill="#016526"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant"
            fill="#02e355"
            label={<LabelLieferung />}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant, ignoriert"
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
            dataKey="Zählung Pflanzen Ziel/Prognose"
            stroke="#b1b1e7"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen Ziel/Prognose, ignoriert"
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
            dataKey="Zählung Pflanzen auspflanzbereit Ziel/Prognose"
            stroke="#02e355"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen auspflanzbereit Ziel/Prognose, ignoriert"
            legendType="circle"
            stroke="#e6ffef"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen"
            stroke="#cc0000"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen Ziel/Prognose"
            stroke="#ffb3b3"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
          <Line
            type="basis"
            dataKey="Zählung Mutterpflanzen Ziel/Prognose, ignoriert"
            legendType="circle"
            stroke="#ffe6e6"
            strokeWidth={2}
            label={<LabelZaehlung />}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

export default observer(KulturTimeline)
