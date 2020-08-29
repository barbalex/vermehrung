import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
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
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'
import format from 'date-fns/format'

import CustomTooltip from './Tooltip'
import LabelLieferung from './LabelLieferung'
import LabelZaehlung from './LabelZaehlung'
import CustomAxisTick from './CustomAxisTick'
import getConstants from '../../../../../utils/constants'
import exists from '../../../../../utils/exists'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import { StoreContext } from '../../../../../models/reactUtils'

const constants = getConstants()

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
  ${(props) => props['data-active'] && 'cursor: pointer;'}
  position: sticky;
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  user-select: none;
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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const KulturTimeline = ({ row, width }) => {
  const store = useContext(StoreContext)
  const { lieferungsSorted, zaehlungsSorted } = store
  const [narrow, setNarrow] = useState(false)

  const zaehlungenDone = zaehlungsSorted
    .filter((z) => z.kultur_id === row.id)
    .filter((z) => z.prognose === false)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= new Date().getTime())
  const lastZaehlungDone = useMemo(() => zaehlungenDone.slice(-1)[0] ?? {}, [
    zaehlungenDone,
  ])
  const zaehlungenPlanned = zaehlungsSorted
    .filter((z) => z.kultur_id === row.id)
    .filter((z) => z.prognose === true)
    .filter((z) => !!z.datum)
  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter((zg) =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some((z) => z.datum >= zg.datum),
  )
  const zaehlungenPlannedIncluded = useMemo(() => {
    let val = zaehlungenPlanned.filter(
      (lg) => !zaehlungenPlannedIgnored.map((l) => l.id).includes(lg.id),
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
      zaehlungenDone.map((l) => {
        const teilzaehlungs = l?.teilzaehlungs ?? []

        return {
          datum: new Date(l.datum).getTime(),
          'Zählung Pflanzen':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ??
            undefined,
          'Zählung Pflanzen auspflanzbereit':
            l?.teilzaehlungs_aggregate?.aggregate?.sum
              ?.anzahl_auspflanzbereit ?? undefined,
          'Zählung Mutterpflanzen':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen,
          'Zählung andere Mengen': teilzaehlungs
            .map((t) => t.andere_menge)
            .join(', '),
          'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
            .map((t) => t.auspflanzbereit_beschreibung)
            .join(', '),
          'Zählung Bemerkungen': teilzaehlungs
            .map((t) => t.bemerkungen)
            .join(', '),
          ereignis: 'Zählung',
        }
      }),
    [zaehlungenDone],
  )
  const zaehlungenPlannedIncludedData = useMemo(
    () =>
      zaehlungenPlannedIncluded.map((l) => {
        const teilzaehlungs = l?.teilzaehlungs ?? []

        return {
          datum: new Date(l.datum).getTime(),
          'Zählung Pflanzen Prognose':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ??
            undefined,
          'Zählung Pflanzen auspflanzbereit Prognose':
            l?.teilzaehlungs_aggregate?.aggregate?.sum
              ?.anzahl_auspflanzbereit ?? undefined,
          'Zählung Mutterpflanzen Prognose':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
            undefined,
          'Zählung Prognose': teilzaehlungs
            .map((t) => (t.prognose ? 'ja' : 'nein'))
            .join(', '),
          'Zählung andere Mengen': teilzaehlungs
            .map((t) => t.andere_menge)
            .join(', '),
          'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
            .map((t) => t.auspflanzbereit_beschreibung)
            .join(', '),
          'Zählung Bemerkungen': teilzaehlungs
            .map((t) => t.bemerkungen)
            .join(', '),
          ereignis: 'Zählung',
        }
      }),
    [zaehlungenPlannedIncluded],
  )
  const zaehlungenPlannedIgnoredData = useMemo(
    () =>
      zaehlungenPlannedIgnored.map((l) => {
        const teilzaehlungs = l?.teilzaehlungs ?? []

        return {
          datum: new Date(l.datum).getTime(),
          'Zählung Pflanzen Prognose, ignoriert':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ??
            undefined,
          'Zählung Pflanzen auspflanzbereit Prognose, ignoriert':
            l?.teilzaehlungs_aggregate?.aggregate?.sum
              ?.anzahl_auspflanzbereit ?? undefined,
          'Zählung Mutterpflanzen Prognose, ignoriert':
            l?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
            undefined,
          'Zählung Prognose': teilzaehlungs
            .map((t) => (t.prognose ? 'ja' : 'nein'))
            .join(', '),
          'Zählung andere Mengen': teilzaehlungs
            .map((t) => t.andere_menge)
            .join(', '),
          'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
            .map((t) => t.auspflanzbereit_beschreibung)
            .join(', '),
          'Zählung Bemerkungen': teilzaehlungs
            .map((t) => t.bemerkungen)
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

  const anLieferungenDone = lieferungsSorted
    .filter((l) => l.nach_kultur_id === row.id)
    .filter((l) => l.geplant === false)
    .filter((l) => !!l.datum)
    .filter((l) => l.datum <= format(new Date(), 'yyyy-mm-dd'))
  const anLieferungenPlanned = lieferungsSorted
    .filter((l) => l.nach_kultur_id === row.id)
    .filter((l) => l.geplant === true)
    .filter((l) => !!l.datum)
  const anLieferungenPlannedIgnored = useMemo(
    () =>
      anLieferungenPlanned.filter((lg) =>
        // check if more recent anLieferungenDone exists
        anLieferungenDone.some((lu) => lu.datum >= lg.datum),
      ),
    [anLieferungenDone, anLieferungenPlanned],
  )
  const anLieferungenPlannedIncluded = useMemo(
    () =>
      anLieferungenPlanned.filter(
        (lg) => !anLieferungenPlannedIgnored.map((l) => l.id).includes(lg.id),
      ),
    [anLieferungenPlannedIgnored, anLieferungenPlanned],
  )
  const anLieferungenForLine = sortBy(
    [...anLieferungenDone, ...anLieferungenPlannedIncluded],
    'datum',
  )
  const ausLieferungenDone = lieferungsSorted
    .filter((l) => l.von_kultur_id === row.id)
    .filter((l) => l.geplant === false)
    .filter((l) => !!l.datum)
    .filter((l) => l.datum <= format(new Date(), 'yyyy-mm-dd'))
  const ausLieferungenPlanned = lieferungsSorted
    .filter((l) => l.von_kultur_id === row.id)
    .filter((l) => l.geplant === true)
    .filter((l) => !!l.datum)
  const ausLieferungenPlannedIgnored = useMemo(
    () =>
      ausLieferungenPlanned.filter((lg) =>
        // check if more recent ausLieferungenDone exists
        ausLieferungenDone.some((l) => l.datum >= lg.datum),
      ),
    [ausLieferungenDone, ausLieferungenPlanned],
  )
  const ausLieferungenPlannedIncluded = useMemo(
    () =>
      ausLieferungenPlanned.filter(
        (lg) => !ausLieferungenPlannedIgnored.map((l) => l.id).includes(lg.id),
      ),
    [ausLieferungenPlannedIgnored, ausLieferungenPlanned],
  )
  const ausLieferungenForLine = sortBy(
    [...ausLieferungenDone, ...ausLieferungenPlannedIncluded],
    'datum',
  )
  const anLieferungenDoneData = useMemo(
    () =>
      anLieferungenDone.map((l) => {
        // 1. previous Zaehlung is basis
        // If none, pretend this is first zaehlung
        const previousZaehlung = zaehlungenForLineReversed.find(
          (z) => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Lieferungen since
        const anLieferungenSince = anLieferungenForLine.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const ausLieferungenSince = ausLieferungenForLine.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_pflanzen ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_auspflanzbereit ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

        return {
          datum: new Date(l.datum).getTime(),
          'Lieferung Pflanzen': l.anzahl_pflanzen || undefined,
          'Lieferung Pflanzen auspflanzbereit':
            l.anzahl_auspflanzbereit || undefined,
          'Lieferung andere Mengen': l.andere_menge,
          'Lieferung Gramm Samen': l.gramm_samen,
          'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
          'Lieferung Bemerkungen': l.bemerkungen,
          'Zählung Pflanzen':
            sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined,
          'Zählung Pflanzen auspflanzbereit':
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined,
          ereignis: 'Lieferung',
        }
      }),
    [
      anLieferungenDone,
      anLieferungenForLine,
      ausLieferungenForLine,
      zaehlungenForLineReversed,
    ],
  )
  const ausLieferungenDoneData = useMemo(
    () =>
      ausLieferungenDone.map((l) => {
        // 1. previous Zaehlung is basis. If none, take 0
        const previousZaehlung = zaehlungenForLineReversed.find(
          (z) => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Lieferungen since
        const anLieferungenSince = anLieferungenForLine.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const ausLieferungenSince = ausLieferungenForLine.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_pflanzen ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_auspflanzbereit ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

        return {
          datum: new Date(l.datum).getTime(),
          'Lieferung Pflanzen': -l.anzahl_pflanzen || undefined,
          'Lieferung Pflanzen auspflanzbereit':
            -l.anzahl_auspflanzbereit || undefined,
          'Lieferung andere Mengen': l.andere_menge,
          'Lieferung Gramm Samen': l.gramm_samen,
          'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
          'Lieferung Bemerkungen': l.bemerkungen,
          'Zählung Pflanzen':
            sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined,
          'Zählung Pflanzen auspflanzbereit':
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined,
          ereignis: 'Lieferung',
        }
      }),
    [
      anLieferungenForLine,
      ausLieferungenDone,
      ausLieferungenForLine,
      zaehlungenForLineReversed,
    ],
  )
  const anLieferungenPlannedData = useMemo(
    () =>
      anLieferungenPlannedIncluded.map((l) => {
        // 1. previous Zaehlung is basis
        // If none, pretend this is first zaehlung
        const previousZaehlung = zaehlungenForLineReversed.find(
          (z) => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Lieferungen since
        const anLieferungenSince = anLieferungenPlannedIncluded.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_pflanzen ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_auspflanzbereit ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Lieferung Pflanzen geplant': l.anzahl_pflanzen || undefined,
          'Lieferung Pflanzen auspflanzbereit geplant':
            l.anzahl_auspflanzbereit || undefined,
          'Lieferung andere Mengen': l.andere_menge,
          'Lieferung Gramm Samen': l.gramm_samen,
          'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
          'Lieferung Bemerkungen': l.bemerkungen,
          ereignis: 'Lieferung',
        }
        if (data.datum < new Date(lastZaehlungDone.datum).getTime()) {
          data['Zählung Pflanzen'] =
            sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined
        } else {
          data['Zählung Pflanzen Prognose'] =
            sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined
          data['Zählung Pflanzen auspflanzbereit Prognose'] =
            sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined
        }
        return data
      }),
    [
      anLieferungenPlannedIncluded,
      ausLieferungenPlannedIncluded,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const anLieferungenPlannedIgnoredData = useMemo(
    () =>
      anLieferungenPlannedIgnored.map((l) => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant, ignoriert': l.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
          l.anzahl_auspflanzbereit || undefined,
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
      ausLieferungenPlannedIncluded.map((l) => {
        // 1. previous Zaehlung is basis
        // If none, pretend this is first zaehlung
        const previousZaehlung = zaehlungenForLineReversed.find(
          (z) => z.datum < l.datum,
        ) || {
          datum: '1900.01.01',
          anzahl_pflanzen: 0,
          anzahl_auspflanzbereit: 0,
        }
        // 2. Summ all Lieferungen since
        const anLieferungenSince = anLieferungenPlannedIncluded.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
          (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
        )
        const sumAnzahlPflanzen =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_pflanzen ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
        const sumAnzahlAuspflanzbereit =
          (previousZaehlung?.teilzaehlungs_aggregate?.aggregate?.sum
            ?.anzahl_auspflanzbereit ?? 0) +
          (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
          (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

        const data = {
          datum: new Date(l.datum).getTime(),
          'Lieferung Pflanzen geplant': -l.anzahl_pflanzen || undefined,
          'Lieferung Pflanzen auspflanzbereit geplant':
            -l.anzahl_auspflanzbereit || undefined,
          'Lieferung andere Mengen': l.andere_menge,
          'Lieferung Gramm Samen': l.gramm_samen,
          'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
          'Lieferung Bemerkungen': l.bemerkungen,
          ereignis: 'Lieferung',
        }
        if (data.datum < new Date(lastZaehlungDone.datum).getTime()) {
          data['Zählung Pflanzen'] =
            sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined
          data['Zählung Pflanzen auspflanzbereit'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined
        } else {
          data['Zählung Pflanzen Prognose'] =
            sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined
          data['Zählung Pflanzen auspflanzbereit Prognose'] =
            sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined
        }
        return data
      }),
    [
      anLieferungenPlannedIncluded,
      ausLieferungenPlannedIncluded,
      lastZaehlungDone.datum,
      zaehlungenForLineReversed,
    ],
  )
  const ausLieferungenPlannedIgnoredData = useMemo(
    () =>
      ausLieferungenPlannedIgnored.map((l) => ({
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant, ignoriert':
          -l.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
          -l.anzahl_auspflanzbereit || undefined,
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
    const url = `${constants?.appUri}/Dokumentation/Zeitachse-Kultur`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  useEffect(() => {
    if (width < 1100 && !narrow) {
      setNarrow(true)
    }
    if (width > 1100 && narrow) {
      setNarrow(false)
    }
  }, [narrow, width])

  const [open, setOpen] = useState(false)
  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  const showCategory = useCallback(
    (category) =>
      !!allData.map((d) => d[category]).filter((d) => exists(d)).length,
    [allData],
  )

  if (!row || !allData.length) {
    return (
      <ErrorBoundary>
        <TitleRow data-active={false} ref={titleRowRef} data-sticky={isSticky}>
          <Title>Zeit-Achse</Title>
          <Content>Sorry, keine Daten verfügbar</Content>
        </TitleRow>
      </ErrorBoundary>
    )
  }

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
        data-active={true}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
        <Title>Zeit-Achse</Title>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open && (
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
                wrapperStyle={{ right: -10, top: 50, fontSize: 12 }}
              />
            )}
            <ReferenceLine y={0} stroke="#000" />
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
            {showCategory('Zählung Pflanzen Prognose') && (
              <Line
                type="monotone"
                connectNulls={true}
                dataKey="Zählung Pflanzen Prognose"
                stroke="#e0e0ff"
                strokeWidth={3}
                label={<LabelZaehlung />}
                isAnimationActive={false}
              />
            )}
            {showCategory('Zählung Pflanzen Prognose, ignoriert') && (
              <Line
                type="basis"
                dataKey="Zählung Pflanzen Prognose, ignoriert"
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
            {showCategory('Zählung Pflanzen auspflanzbereit Prognose') && (
              <Line
                type="monotone"
                connectNulls={true}
                dataKey="Zählung Pflanzen auspflanzbereit Prognose"
                stroke="#9cffc0"
                strokeWidth={3}
                label={<LabelZaehlung />}
                isAnimationActive={false}
              />
            )}
            {showCategory(
              'Zählung Pflanzen auspflanzbereit Prognose, ignoriert',
            ) && (
              <Line
                type="basis"
                dataKey="Zählung Pflanzen auspflanzbereit Prognose, ignoriert"
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
            {showCategory('Zählung Mutterpflanzen Prognose') && (
              <Line
                type="monotone"
                connectNulls={true}
                dataKey="Zählung Mutterpflanzen Prognose"
                stroke="#ffb3b3"
                strokeWidth={3}
                label={<LabelZaehlung />}
                isAnimationActive={false}
              />
            )}
            {showCategory('Zählung Mutterpflanzen Prognose, ignoriert') && (
              <Line
                type="basis"
                dataKey="Zählung Mutterpflanzen Prognose, ignoriert"
                legendType="circle"
                stroke="#ffe6e6"
                strokeWidth={3}
                label={<LabelZaehlung />}
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(KulturTimeline))
