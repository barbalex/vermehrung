import format from 'date-fns/format'
import sumBy from 'lodash/sumBy'
import { Q } from '@nozbe/watermelondb'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import artLabelFromArt from '../../../../../utils/artLabelFromArt'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'
import exists from '../../../../../utils/exists'
import kulturLabelFromKultur from '../../../../../utils/kulturLabelFromKultur'
import zaehlungSort from '../../../../../utils/zaehlungSort'

const buildExceljsWorksheetsForKulturBedarfsplanung = async ({
  store,
  workbook,
}) => {
  const { kultursSorted, teilzaehlungsSorted, lieferungsSorted, db } = store

  const kulturs = await Promise.all(
    kultursSorted
      .filter((kultur) => {
        if (!kultur.aktiv) return false
        if (kultur._deleted) return false
        const garten = store.gartens.get(kultur.garten_id)
        if (!garten) return false
        if (!garten?.aktiv) return false
        if (garten?._deleted) return false
        return true
      })
      .map(async (kultur) => {
        const art = kultur.art_id ? store.arts.get(kultur.art_id) : {}
        //const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
        const herkunft = kultur?.herkunft_id
          ? store.herkunfts.get(kultur.herkunft_id)
          : {}
        const garten = kultur?.garten_id
          ? store.gartens.get(kultur.garten_id)
          : {}

        const ownZaehlungen = await db.collections
          .get('zaehlung')
          .query(
            Q.where('_deleted', false),
            Q.where('kultur_id', kultur.id),
            Q.where('datum', Q.notEq(null)),
            Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
          )
          .fetch()
        const ownZaehlungenSorted = ownZaehlungen.sort((a, b) =>
          zaehlungSort({ a, b }),
        )
        const lastZaehlung = ownZaehlungenSorted[ownZaehlungenSorted.length - 1]
        const lZTeilzaehlungs = lastZaehlung
          ? teilzaehlungsSorted.filter((t) => t.zaehlung_id === lastZaehlung.id)
          : []

        // danger: sumBy returns 0 when field was undefined!
        const tzsToSumAnzahlPflanzen = lZTeilzaehlungs.filter((l) =>
          exists(l.anzahl_pflanzen),
        )
        const anzahl_pflanzen = tzsToSumAnzahlPflanzen.length
          ? sumBy(tzsToSumAnzahlPflanzen, 'anzahl_pflanzen')
          : ''
        const tzsToSumAnzahlAuspflanzungsbereit = lZTeilzaehlungs.filter((l) =>
          exists(l.anzahl_auspflanzbereit),
        )
        const anzahl_auspflanzbereit = tzsToSumAnzahlAuspflanzungsbereit.length
          ? sumBy(tzsToSumAnzahlAuspflanzungsbereit, 'anzahl_auspflanzbereit')
          : ''
        const tzsToSumAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
          exists(l.anzahl_mutterpflanzen),
        )
        const anzahl_mutterpflanzen = tzsToSumAnzahlMutterpflanzen.length
          ? sumBy(tzsToSumAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
          : ''
        const anzahl_jungpflanzen =
          exists(anzahl_pflanzen) &&
          (exists(anzahl_auspflanzbereit) || exists(anzahl_mutterpflanzen))
            ? anzahl_pflanzen -
              (anzahl_auspflanzbereit ?? 0) -
              (anzahl_mutterpflanzen ?? 0)
            : ''

        const ownAusLieferungen = lieferungsSorted
          .filter((l) => l.von_kultur_id === kultur.id)
          .filter((l) => !!l.datum)
          .filter((l) => exists(l.anzahl_pflanzen))
        const lastAusLieferung = ownAusLieferungen[ownAusLieferungen.length - 1]
        const letzte_lieferung_anzahl_pflanzen =
          lastAusLieferung?.anzahl_pflanzen ?? ''
        const letzte_lieferung_anzahl_auspflanzbereit =
          lastAusLieferung?.anzahl_auspflanzbereit ?? ''
        const letzte_lieferung_anzahl_mutterpflanzen =
          lastAusLieferung?.anzahl_mutterpflanzen ?? ''
        const letzte_lieferung_anzahl_jungpflanzen =
          exists(letzte_lieferung_anzahl_pflanzen) &&
          (exists(letzte_lieferung_anzahl_auspflanzbereit) ||
            exists(letzte_lieferung_anzahl_mutterpflanzen))
            ? letzte_lieferung_anzahl_pflanzen -
              (letzte_lieferung_anzahl_auspflanzbereit ?? 0) -
              (letzte_lieferung_anzahl_mutterpflanzen ?? 0)
            : ''

        const auslSinceLastZaehlung = ownAusLieferungen
          .filter(
            (l) => l.datum && l.datum > (lastZaehlung?.datum ?? '1970-01-01'),
          )
          .filter((l) => exists(l.anzahl_pflanzen))
        const auslSinceAnzahlPflanzen = auslSinceLastZaehlung.length
          ? sumBy(auslSinceLastZaehlung, 'anzahl_pflanzen')
          : ''
        const auslSinceWithAnzahlAuspflanzungsbereit = auslSinceLastZaehlung.filter(
          (l) => exists(l.anzahl_auspflanzbereit),
        )
        const auslSinceAnzahlAuspflanzbereit = auslSinceWithAnzahlAuspflanzungsbereit.length
          ? sumBy(
              auslSinceWithAnzahlAuspflanzungsbereit,
              'anzahl_auspflanzbereit',
            )
          : ''
        const auslSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
          exists(l.anzahl_mutterpflanzen),
        )
        const auslSinceAnzahlMutterpflanzen = auslSinceWithAnzahlMutterpflanzen.length
          ? sumBy(auslSinceWithAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
          : ''
        const auslSinceAnzahlJungpflanzen =
          exists(auslSinceAnzahlPflanzen) &&
          (exists(auslSinceAnzahlAuspflanzbereit) ||
            exists(auslSinceAnzahlMutterpflanzen))
            ? auslSinceAnzahlPflanzen -
              (auslSinceAnzahlAuspflanzbereit ?? 0) -
              (auslSinceAnzahlMutterpflanzen ?? 0)
            : ''

        const ownAnLieferungen = lieferungsSorted
          .filter((l) => l.nach_kultur_id === kultur.id)
          .filter((l) => !!l.datum)
          .filter((l) => exists(l.anzahl_pflanzen))

        const anlSinceLastZaehlung = ownAnLieferungen
          .filter(
            (l) => l.datum && l.datum > (lastZaehlung?.datum ?? '1970-01-01'),
          )
          .filter((l) => exists(l.anzahl_pflanzen))
        const anlSinceAnzahlPflanzen = anlSinceLastZaehlung.length
          ? sumBy(anlSinceLastZaehlung, 'anzahl_pflanzen')
          : ''
        const anlSinceWithAnzahlAuspflanzungsbereit = anlSinceLastZaehlung.filter(
          (l) => exists(l.anzahl_auspflanzbereit),
        )
        const anlSinceAnzahlAuspflanzbereit = anlSinceWithAnzahlAuspflanzungsbereit.length
          ? sumBy(
              anlSinceWithAnzahlAuspflanzungsbereit,
              'anzahl_auspflanzbereit',
            )
          : ''
        const anlSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
          exists(l.anzahl_mutterpflanzen),
        )
        const anlSinceAnzahlMutterpflanzen = anlSinceWithAnzahlMutterpflanzen.length
          ? sumBy(anlSinceWithAnzahlMutterpflanzen, 'anzahl_mutterpflanzen')
          : ''
        const anlSinceAnzahlJungpflanzen =
          exists(anlSinceAnzahlPflanzen) &&
          (exists(anlSinceAnzahlAuspflanzbereit) ||
            exists(anlSinceAnzahlMutterpflanzen))
            ? anlSinceAnzahlPflanzen -
              (anlSinceAnzahlAuspflanzbereit ?? 0) -
              (anlSinceAnzahlMutterpflanzen ?? 0)
            : ''

        const row = {
          id: kultur.id,
          label: kulturLabelFromKultur({ kultur, store }),
          //art_id: kultur.art_id,
          //art_ae_id: aeArt?.id ?? '',
          artname: artLabelFromArt({ art, store }),
          herkunft_id: kultur.herkunft_id,
          herkunft_nr: herkunft?.nr ?? '',
          herkunft_label: herkunftLabelFromHerkunft({ herkunft }),
          garten_id: kultur.garten_id,
          garten_label: gartenLabelFromGarten({ garten, store }),
          zwischenlager: kultur.zwischenlager,
          erhaltungskultur: kultur.erhaltungskultur,
          von_anzahl_individuen: kultur.von_anzahl_individuen,
          bemerkungen: kultur.bemerkungen,
          aktiv: kultur.aktiv,
          //changed: kultur.changed,
          //changed_by: kultur.changed_by,
          letzte_zaehlung_datum: lastZaehlung
            ? format(new Date(lastZaehlung.datum), 'yyyy.MM.dd')
            : '',
          letzte_zaehlung_prognose: lastZaehlung?.prognose ?? '',
          letzte_zaehlung_bemerkungen: lastZaehlung?.bemerkungen ?? '',
          letzte_zaehlung_anzahl_pflanzen: anzahl_pflanzen,
          letzte_zaehlung_anzahl_auspflanzbereit: anzahl_auspflanzbereit,
          letzte_zaehlung_anzahl_mutterpflanzen: anzahl_mutterpflanzen,
          letzte_zaehlung_anzahl_jungpflanzen: anzahl_jungpflanzen,
          letzte_lieferung_datum: lastAusLieferung
            ? format(new Date(lastAusLieferung.datum), 'yyyy.MM.dd')
            : '',
          letzte_lieferung_anzahl_pflanzen,
          letzte_lieferung_anzahl_auspflanzbereit,
          letzte_lieferung_anzahl_mutterpflanzen,
          letzte_lieferung_anzahl_jungpflanzen,
          auslieferungen_seit_letzter_zaehlung_daten: auslSinceLastZaehlung
            .map((l) => format(new Date(l.datum), 'yyyy.MM.dd'))
            .join(', '),
          auslieferungen_seit_letzter_zaehlung_anzahl_pflanzen: auslSinceAnzahlPflanzen,
          auslieferungen_seit_letzter_zaehlung_anzahl_auspflanzbereit: auslSinceAnzahlAuspflanzbereit,
          auslieferungen_seit_letzter_zaehlung_anzahl_mutterpflanzen: auslSinceAnzahlMutterpflanzen,
          auslieferungen_seit_letzter_zaehlung_anzahl_jungpflanzen: auslSinceAnzahlJungpflanzen,
          anlieferungen_seit_letzter_zaehlung_daten: anlSinceLastZaehlung
            .map((l) => format(new Date(l.datum), 'yyyy.MM.dd'))
            .join(', '),
          anlieferungen_seit_letzter_zaehlung_anzahl_pflanzen: anlSinceAnzahlPflanzen,
          anlieferungen_seit_letzter_zaehlung_anzahl_auspflanzbereit: anlSinceAnzahlAuspflanzbereit,
          anlieferungen_seit_letzter_zaehlung_anzahl_mutterpflanzen: anlSinceAnzahlMutterpflanzen,
          anlieferungen_seit_letzter_zaehlung_anzahl_jungpflanzen: anlSinceAnzahlJungpflanzen,
          bilanz_anzahl_pflanzen: exists(anzahl_pflanzen)
            ? anzahl_pflanzen -
              (auslSinceAnzahlPflanzen || 0) +
              (anlSinceAnzahlPflanzen || 0)
            : '',
          bilanz_anzahl_auspflanzbereit: exists(anzahl_auspflanzbereit)
            ? anzahl_auspflanzbereit -
              (auslSinceAnzahlAuspflanzbereit || 0) +
              (anlSinceAnzahlAuspflanzbereit || 0)
            : '',
          bilanz_anzahl_mutterpflanzen: exists(anzahl_mutterpflanzen)
            ? anzahl_mutterpflanzen -
              (auslSinceAnzahlMutterpflanzen || 0) +
              (anlSinceAnzahlMutterpflanzen || 0)
            : '',
          bilanz_anzahl_jungpflanzen: exists(anzahl_jungpflanzen)
            ? anzahl_jungpflanzen -
              (auslSinceAnzahlJungpflanzen || 0) +
              (anlSinceAnzahlJungpflanzen || 0)
            : '',
        }

        return row
      }),
  )

  addWorksheetToExceljsWorkbook({
    workbook,
    title: `Kulturen für Bedarfsplanung`,
    data: kulturs,
  })

  return
}

export default buildExceljsWorksheetsForKulturBedarfsplanung
