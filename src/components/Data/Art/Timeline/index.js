import React, { useCallback, useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import sum from 'lodash/sum'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Timeline from './Timeline'
import appBaseUrl from '../../../../utils/appBaseUrl'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import exists from '../../../../utils/exists'

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
  ${(props) => props['data-online'] && 'cursor: pointer;'}
  user-select: none;
  ${(props) => props['data-open'] && 'position: sticky;'}
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

const TimelineArea = ({ artId = '99999999-9999-9999-9999-999999999999' }) => {
  const store = useContext(StoreContext)
  const { online, zaehlungsSorted, sammlungsSorted, lieferungsSorted } = store
  const [open, setOpen] = useState(false)

  const openDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Zeitachse-Art`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { data, error, loading } = useQuery((store) =>
    store.queryArt_sums({
      where: { art_id: { _eq: artId } },
    }),
  )
  const artSums = data?.art_sums ?? []
  const now = new Date().getTime()

  const zaehlungsDone = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => !z.prognose)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= now)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const lastZaehlungDone = zaehlungsDone.slice(-1)[0] ?? {}
  const zaehlungsPlanned = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlannedIgnored = zaehlungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    zaehlungsDone.some((z) => z.datum >= zg.datum),
  )
  const zaehlungsPlannedIncluded = useMemo(() => {
    let val = zaehlungsPlanned.filter(
      (lg) => !zaehlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
    )
    if (val.length) {
      // need to add last zaehlung to zaehlungsPlannedIncluded to connect lines
      val = [lastZaehlungDone, ...val]
    }
    return val
  }, [lastZaehlungDone, zaehlungsPlanned, zaehlungsPlannedIgnored])

  const sammlungsDone = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= now)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const lastSammlungDone = sammlungsDone.slice(-1)[0] ?? {}
  const sammlungsPlanned = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlannedIgnored = sammlungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    sammlungsDone.some((z) => z.datum >= zg.datum),
  )
  const sammlungsPlannedIncluded = useMemo(() => {
    let val = sammlungsPlanned.filter(
      (lg) => !sammlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
    )
    if (val.length) {
      // need to add last zaehlung to sammlungsPlannedIncluded to connect lines
      val = [lastSammlungDone, ...val]
    }
    return val
  }, [lastSammlungDone, sammlungsPlanned, sammlungsPlannedIgnored])

  const lieferungsDone = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= now)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const lastLieferungDone = lieferungsDone.slice(-1)[0] ?? {}
  const lieferungsPlanned = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const lieferungsPlannedIgnored = lieferungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    lieferungsDone.some((z) => z.datum >= zg.datum),
  )
  const lieferungsPlannedIncluded = useMemo(() => {
    let val = lieferungsPlanned.filter(
      (lg) => !lieferungsPlannedIgnored.map((l) => l.id).includes(lg.id),
    )
    if (val.length) {
      // need to add last zaehlung to lieferungsPlannedIncluded to connect lines
      val = [lastLieferungDone, ...val]
    }
    return val
  }, [lastLieferungDone, lieferungsPlanned, lieferungsPlannedIgnored])

  const allDataRaw = useMemo(
    () =>
      sortBy(
        [
          ...zaehlungsDone,
          ...zaehlungsPlannedIncluded,
          ...sammlungsDone,
          ...sammlungsPlannedIncluded,
          ...lieferungsDone,
          ...lieferungsPlannedIncluded,
        ],
        'datum',
      ),
    [
      lieferungsDone,
      lieferungsPlannedIncluded,
      sammlungsDone,
      sammlungsPlannedIncluded,
      zaehlungsDone,
      zaehlungsPlannedIncluded,
    ],
  )

  const dates = uniq(allDataRaw.map((z) => z.datum))
  const datasets = dates.map((date) => {
    const sammlungsDoneNow = sammlungsDone.filter((s) => s.datum === date)
    const sammlungsCountNow = sammlungsDoneNow.length
    const sammlungPflanzenNow = sum(
      sammlungsDoneNow.map((s) => s?.anzahl_pflanzen ?? 0),
    )
    const sammlungsPlannedNow = sammlungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    const sammlungPflanzenPlannedNow = sum(
      sammlungsPlannedNow.map((s) => s?.anzahl_pflanzen ?? 0),
    )

    const lieferungsDoneNow = lieferungsDone.filter((s) => s.datum === date)
    const lieferungsCountNow = lieferungsDone.length
    const lieferungPflanzenNow = sum(
      lieferungsDoneNow.map((s) => s?.anzahl_pflanzen ?? 0),
    )
    const lieferungsPlannedNow = lieferungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    const lieferungPflanzenPlannedNow = sum(
      lieferungsPlannedNow.map((s) => s?.anzahl_pflanzen ?? 0),
    )

    const zaehlungsDoneNow = zaehlungsDone.filter((s) => s.datum === date)
    const zaehlungsCountNow = zaehlungsDoneNow.length
    const zaehlungPflanzenNow = sum(
      zaehlungsDoneNow.map(
        (s) => s?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? 0,
      ),
    )
    const zaehlungsPlannedNow = zaehlungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    const zaehlungPflanzenPlannedNow = sum(
      zaehlungsPlannedNow.map(
        (s) => s?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? 0,
      ),
    )

    let anzahlPflanzenNow = zaehlungPflanzenNow
    if (zaehlungPflanzenNow === undefined) {
      const lastZaehlungPflanzen = zaehlungsDoneNow
        .filter((z) => !!z.datum)
        .filter((z) => z.datum < date)
        .slice(-1)[0]
      const lastZaehlungPflanzenDate = lastZaehlungPflanzen?.datum
      const lastZaehlungPflanzenTime = lastZaehlungPflanzenDate
        ? new Date(lastZaehlungPflanzenDate).getTime()
        : 1
      const sammlungsDoneSince = sammlungsDoneNow
        .filter((s) => !!s.datum)
        .filter((s) => {
          const ownTime = new Date(s.datum).getTime()
          return ownTime > lastZaehlungPflanzenTime && ownTime < now
        })
      const lieferungsDoneSince = lieferungsDoneNow
        .filter((s) => !!s.datum)
        .filter((s) => {
          const ownTime = new Date(s.datum).getTime()
          return ownTime > lastZaehlungPflanzenTime && ownTime < now
        })
      const anzahlPflanzenSince = sum([
        ...sammlungsDoneSince.map((s) => s.anzahl_pflanzen),
        ...lieferungsDoneSince.map((l) => l.anzahl_pflanzen),
      ])
      const anzahlPflanzenBefore = lastZaehlungPflanzen?.anzahl_pflanzen ?? 0
      anzahlPflanzenNow = anzahlPflanzenBefore + anzahlPflanzenSince
    }
    const zaehlungsTitle = zaehlungsCountNow
      ? zaehlungsCountNow === 1
        ? 'Zählung'
        : `${zaehlungsCountNow} Zählungen`
      : undefined
    const sammlungsTitle = sammlungsCountNow
      ? sammlungsCountNow === 1
        ? 'Sammlung'
        : `${sammlungsCountNow} Sammlungen`
      : undefined
    const lieferungsTitle = lieferungsCountNow
      ? lieferungsCountNow === 1
        ? 'Aus-Pflanzung'
        : `${lieferungsCountNow} Aus-Pflanzungen`
      : undefined

    return {
      datum: date,
      'Anzahl Pflanzen': anzahlPflanzenNow,
      'Sammlung Pflanzen': sammlungPflanzenNow,
      'Sammlung Pflanzen geplant': sammlungPflanzenPlannedNow,
      'Auspflanzung Pflanzen': lieferungPflanzenNow,
      'Auspflanzung Pflanzen geplant': lieferungPflanzenPlannedNow,
      'Zählung Pflanzen': zaehlungPflanzenNow,
      'Prognose Pflanzen': zaehlungPflanzenPlannedNow,
      ereignis: [zaehlungsTitle, sammlungsTitle, lieferungsTitle].join(', '),
    }
  })

  console.log('TimelineArea', {
    artSums,
    artId,
    dates,
    datasets,
  })

  if (!online) {
    return (
      <ErrorBoundary>
        <TitleRow data-online={online}>
          <Title>Zeit-Achse</Title>
          <Content>Sorry, nur online verfügbar</Content>
        </TitleRow>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
        data-online={online}
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
        <>
          {loading ? (
            'Lade Daten...'
          ) : error ? (
            `Fehler: ${error.message}`
          ) : (
            <Timeline key={artId} datasets={datasets} />
          )}
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(TimelineArea)
