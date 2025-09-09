import format from 'date-fns/format'
import sumBy from 'lodash/sumBy'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'

import { addWorksheetToExceljsWorkbook } from '../../../../../utils/addWorksheetToExceljsWorkbook.js'
import { exists } from '../../../../../utils/exists.js'
import { kultursSortedFromKulturs } from '../../../../../utils/kultursSortedFromKulturs.js'
import { zaehlungSort } from '../../../../../utils/zaehlungSort.js'
import { lieferungSort } from '../../../../../utils/lieferungSort.js'

export const buildExceljsWorksheetsForKulturBedarfsplanung = async ({
  store,
  workbook,
}) => {
  const { db } = store

  let kulturs = []
  try {
    kulturs =
      (await db
        .get('kultur')
        .query(
          Q.where('_deleted', false),
          Q.where('aktiv', true),
          Q.where('garten_id', Q.notEq(null)),
          Q.on('garten', [Q.where('aktiv', true), Q.where('_deleted', false)]),
        )
        .fetch()) ?? []
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  const kultursData = await Promise.all(
    kultursSorted.map(async (kultur) => {
      let kulturLabel
      try {
        kulturLabel = await kultur.label.pipe(first$()).toPromise()
      } catch {}
      let art
      try {
        art = await kultur.art.fetch()
      } catch {}
      let artname
      try {
        artname = await art.label.pipe(first$()).toPromise()
      } catch {}
      let avs
      try {
        avs = await art.avs.extend(Q.where('_deleted', false)).fetch()
      } catch {}
      const avsLabels = []
      try {
        for (const av of avs) {
          const avsLabel = await av.personLabel.pipe(first$()).toPromise()
          if (avsLabel) avsLabels.push(avsLabel)
        }
      } catch {}
      let herkunft
      try {
        herkunft = await kultur.herkunft.fetch()
      } catch {}
      let garten
      try {
        garten = await kultur.garten.fetch()
      } catch {}
      let garten_label
      try {
        garten_label = await garten.label.pipe(first$()).toPromise()
      } catch {}

      let ownZaehlungen = []
      try {
        ownZaehlungen =
          (await db
            .get('zaehlung')
            .query(
              Q.where('_deleted', false),
              Q.where('kultur_id', kultur.id),
              Q.where('datum', Q.notEq(null)),
              Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
            )
            .fetch()) ?? []
      } catch {}
      const ownZaehlungenSorted = ownZaehlungen.sort(zaehlungSort)
      const lastZaehlung = ownZaehlungenSorted[ownZaehlungenSorted.length - 1]
      let lZTeilzaehlungs = []
      try {
        lZTeilzaehlungs =
          lastZaehlung.teilzaehlungs ?
            await lastZaehlung?.teilzaehlungs
              .extend(Q.where('_deleted', false))
              ?.fetch()
          : []
      } catch {}

      // danger: sumBy returns 0 when field was undefined!
      const tzsToSumAnzahlPflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_pflanzen),
      )
      const anzahl_pflanzen =
        tzsToSumAnzahlPflanzen.length ?
          sumBy(tzsToSumAnzahlPflanzen, 'anzahl_pflanzen')
        : ''
      const tzsToSumAnzahlAuspflanzungsbereit = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_auspflanzbereit),
      )
      const anzahl_auspflanzbereit =
        tzsToSumAnzahlAuspflanzungsbereit.length ?
          sumBy(tzsToSumAnzahlAuspflanzungsbereit, 'anzahl_auspflanzbereit')
        : ''
      const tzsToSumAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_mutterpflanzen),
      )
      const anzahl_mutterpflanzen =
        tzsToSumAnzahlMutterpflanzen.length ?
          sumBy(tzsToSumAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
        : ''
      const anzahl_jungpflanzen =
        (
          exists(anzahl_pflanzen) &&
          (exists(anzahl_auspflanzbereit) || exists(anzahl_mutterpflanzen))
        ) ?
          anzahl_pflanzen -
          (anzahl_auspflanzbereit ?? 0) -
          (anzahl_mutterpflanzen ?? 0)
        : ''
      const andere_mengen = lZTeilzaehlungs
        .map((l) => l.andere_menge)
        .join(', ')

      let lieferungs = []
      try {
        lieferungs =
          (await db
            .get('lieferung')
            .query(
              Q.where('_deleted', false),
              Q.where('geplant', false),
              Q.where('datum', Q.notEq(null)),
              Q.where('anzahl_pflanzen', Q.notEq(null)),
            )
            .fetch()) ?? []
      } catch {}
      const lieferungsSorted = lieferungs.sort(lieferungSort)

      let lieferungsGeplant = []
      try {
        lieferungsGeplant =
          (await db
            .get('lieferung')
            .query(
              Q.where('_deleted', false),
              Q.where('geplant', true),
              Q.where('datum', Q.notEq(null)),
              Q.where('anzahl_pflanzen', Q.notEq(null)),
            )
            .fetch()) ?? []
      } catch {}
      const lieferungsGeplantSorted = lieferungsGeplant.sort(lieferungSort)
      const ownAusLieferungsGeplant = lieferungsGeplantSorted.filter(
        (l) => l.von_kultur_id === kultur.id,
      )

      const ownAusLieferungen = lieferungsSorted.filter(
        (l) => l.von_kultur_id === kultur.id,
      )
      const lastAusLieferung = ownAusLieferungen[ownAusLieferungen.length - 1]
      const letzte_lieferung_anzahl_pflanzen =
        lastAusLieferung?.anzahl_pflanzen ?? ''
      const letzte_lieferung_anzahl_auspflanzbereit =
        lastAusLieferung?.anzahl_auspflanzbereit ?? ''
      const letzte_lieferung_anzahl_mutterpflanzen =
        lastAusLieferung?.anzahl_mutterpflanzen ?? ''
      const letzte_lieferung_anzahl_jungpflanzen =
        (
          exists(letzte_lieferung_anzahl_pflanzen) &&
          (exists(letzte_lieferung_anzahl_auspflanzbereit) ||
            exists(letzte_lieferung_anzahl_mutterpflanzen))
        ) ?
          letzte_lieferung_anzahl_pflanzen -
          (letzte_lieferung_anzahl_auspflanzbereit ?? 0) -
          (letzte_lieferung_anzahl_mutterpflanzen ?? 0)
        : ''

      const auslSinceLastZaehlung = ownAusLieferungen
        .filter(
          (l) => l.datum && l.datum > (lastZaehlung?.datum ?? '1970-01-01'),
        )
        .filter((l) => exists(l.anzahl_pflanzen))
      const auslSinceAnzahlPflanzen =
        auslSinceLastZaehlung.length ?
          sumBy(auslSinceLastZaehlung, 'anzahl_pflanzen')
        : ''
      const auslSinceWithAnzahlAuspflanzungsbereit =
        auslSinceLastZaehlung.filter((l) => exists(l.anzahl_auspflanzbereit))
      const auslSinceAnzahlAuspflanzbereit =
        auslSinceWithAnzahlAuspflanzungsbereit.length ?
          sumBy(
            auslSinceWithAnzahlAuspflanzungsbereit,
            'anzahl_auspflanzbereit',
          )
        : ''
      const auslSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_mutterpflanzen),
      )
      const auslSinceAnzahlMutterpflanzen =
        auslSinceWithAnzahlMutterpflanzen.length ?
          sumBy(auslSinceWithAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
        : ''
      const auslSinceAnzahlJungpflanzen =
        (
          exists(auslSinceAnzahlPflanzen) &&
          (exists(auslSinceAnzahlAuspflanzbereit) ||
            exists(auslSinceAnzahlMutterpflanzen))
        ) ?
          auslSinceAnzahlPflanzen -
          (auslSinceAnzahlAuspflanzbereit ?? 0) -
          (auslSinceAnzahlMutterpflanzen ?? 0)
        : ''

      const ownAnLieferungen = lieferungsSorted.filter(
        (l) => l.nach_kultur_id === kultur.id,
      )

      const anlSinceLastZaehlung = ownAnLieferungen
        .filter(
          (l) => l.datum && l.datum > (lastZaehlung?.datum ?? '1970-01-01'),
        )
        .filter((l) => exists(l.anzahl_pflanzen))
      const anlSinceAnzahlPflanzen =
        anlSinceLastZaehlung.length ?
          sumBy(anlSinceLastZaehlung, 'anzahl_pflanzen')
        : ''
      const anlSinceWithAnzahlAuspflanzungsbereit = anlSinceLastZaehlung.filter(
        (l) => exists(l.anzahl_auspflanzbereit),
      )
      const anlSinceAnzahlAuspflanzbereit =
        anlSinceWithAnzahlAuspflanzungsbereit.length ?
          sumBy(anlSinceWithAnzahlAuspflanzungsbereit, 'anzahl_auspflanzbereit')
        : ''
      const anlSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_mutterpflanzen),
      )
      const anlSinceAnzahlMutterpflanzen =
        anlSinceWithAnzahlMutterpflanzen.length ?
          sumBy(anlSinceWithAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
        : ''
      const anlSinceAnzahlJungpflanzen =
        (
          exists(anlSinceAnzahlPflanzen) &&
          (exists(anlSinceAnzahlAuspflanzbereit) ||
            exists(anlSinceAnzahlMutterpflanzen))
        ) ?
          anlSinceAnzahlPflanzen -
          (anlSinceAnzahlAuspflanzbereit ?? 0) -
          (anlSinceAnzahlMutterpflanzen ?? 0)
        : ''

      const row = {
        id: kultur.id,
        label: kulturLabel,
        artname,
        set: art?.set,
        mitarbeitende: avsLabels.sort().join(', '),
        apflora_artverantwortlich: art?.apflora_av,
        aktionsplan_art: art?.apflora_ap,
        herkunft_id: kultur.herkunft_id,
        herkunft_nr: herkunft?.nr ?? '',
        herkunft_gemeinde: herkunft?.gemeinde ?? '',
        herkunft_lokalname: herkunft?.lokalname ?? '',
        garten_id: kultur.garten_id,
        garten_label,
        zwischenlager: kultur.zwischenlager,
        erhaltungskultur: kultur.erhaltungskultur,
        von_anzahl_individuen: kultur.von_anzahl_individuen,
        bemerkungen: kultur.bemerkungen,
        aktiv: kultur.aktiv,
        zaehlungen_daten: ownZaehlungenSorted
          .map((z) => format(new Date(z.datum), 'yyyy.MM.dd'))
          .join(', '),
        letzte_zaehlung_datum:
          lastZaehlung ?
            format(new Date(lastZaehlung.datum), 'yyyy.MM.dd')
          : '',
        letzte_zaehlung_bedarf: lastZaehlung?.prognose ?? '',
        letzte_zaehlung_bemerkungen: lastZaehlung?.bemerkungen ?? '',
        letzte_zaehlung_anzahl_pflanzen: anzahl_pflanzen,
        letzte_zaehlung_anzahl_auspflanzbereit: anzahl_auspflanzbereit,
        letzte_zaehlung_anzahl_mutterpflanzen: anzahl_mutterpflanzen,
        letzte_zaehlung_anzahl_jungpflanzen: anzahl_jungpflanzen,
        letzte_zaehlung_andere_mengen: andere_mengen,
        letzte_lieferung_datum:
          lastAusLieferung ?
            format(new Date(lastAusLieferung.datum), 'yyyy.MM.dd')
          : '',
        letzte_lieferung_anzahl_pflanzen,
        letzte_lieferung_anzahl_auspflanzbereit,
        letzte_lieferung_anzahl_mutterpflanzen,
        letzte_lieferung_anzahl_jungpflanzen,
        auslieferungen_seit_letzter_zaehlung_daten: auslSinceLastZaehlung
          .map((l) => format(new Date(l.datum), 'yyyy.MM.dd'))
          .join(', '),
        auslieferungen_seit_letzter_zaehlung_anzahl_pflanzen:
          auslSinceAnzahlPflanzen,
        auslieferungen_seit_letzter_zaehlung_anzahl_auspflanzbereit:
          auslSinceAnzahlAuspflanzbereit,
        auslieferungen_seit_letzter_zaehlung_anzahl_mutterpflanzen:
          auslSinceAnzahlMutterpflanzen,
        auslieferungen_seit_letzter_zaehlung_anzahl_jungpflanzen:
          auslSinceAnzahlJungpflanzen,
        anlieferungen_seit_letzter_zaehlung_daten: anlSinceLastZaehlung
          .map((l) => format(new Date(l.datum), 'yyyy.MM.dd'))
          .join(', '),
        anlieferungen_seit_letzter_zaehlung_anzahl_pflanzen:
          anlSinceAnzahlPflanzen,
        anlieferungen_seit_letzter_zaehlung_anzahl_auspflanzbereit:
          anlSinceAnzahlAuspflanzbereit,
        anlieferungen_seit_letzter_zaehlung_anzahl_mutterpflanzen:
          anlSinceAnzahlMutterpflanzen,
        anlieferungen_seit_letzter_zaehlung_anzahl_jungpflanzen:
          anlSinceAnzahlJungpflanzen,
        bilanz_anzahl_pflanzen:
          exists(anzahl_pflanzen) ?
            anzahl_pflanzen -
            (auslSinceAnzahlPflanzen || 0) +
            (anlSinceAnzahlPflanzen || 0)
          : '',
        bilanz_anzahl_auspflanzbereit:
          exists(anzahl_auspflanzbereit) ?
            anzahl_auspflanzbereit -
            (auslSinceAnzahlAuspflanzbereit || 0) +
            (anlSinceAnzahlAuspflanzbereit || 0)
          : '',
        bilanz_anzahl_mutterpflanzen:
          exists(anzahl_mutterpflanzen) ?
            anzahl_mutterpflanzen -
            (auslSinceAnzahlMutterpflanzen || 0) +
            (anlSinceAnzahlMutterpflanzen || 0)
          : '',
        bilanz_anzahl_jungpflanzen:
          exists(anzahl_jungpflanzen) ?
            anzahl_jungpflanzen -
            (auslSinceAnzahlJungpflanzen || 0) +
            (anlSinceAnzahlJungpflanzen || 0)
          : '',
        auslieferungen_geplant: ownAusLieferungsGeplant
          .map(
            (l) =>
              `${format(new Date(l.datum), 'yyyy.MM.dd')}: ${
                l.anzahl_pflanzen ?? 0
              } Pflanzen${
                exists(l.anzahl_auspflanzbereit) ?
                  `, ${l.anzahl_auspflanzbereit} auspflanzbereit`
                : ''
              }${
                exists(l.gramm_samen) ? `, ${l.gramm_samen} Gramm Samen` : ''
              }${exists(l.andere_menge) ? `, ${l.andere_menge}` : ''}`,
          )
          .join('; '),
      }

      return row
    }),
  )

  // console.log('kultursData:', kultursData)

  addWorksheetToExceljsWorkbook({
    workbook,
    title: `Kulturen für Bedarfsplanung`,
    data: kultursData,
  })

  return
}
