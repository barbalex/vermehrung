import format from 'date-fns/format'
import sumBy from 'lodash/sumBy'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import exists from '../../../../../utils/exists'
import kultursSortedFromKulturs from '../../../../../utils/kultursSortedFromKulturs'
import zaehlungSort from '../../../../../utils/zaehlungSort'
import lieferungSort from '../../../../../utils/lieferungSort'
import collectionFromTable from '../../../../../utils/collectionFromTable'
import addTotalCriteriaToWhere from '../../../../../utils/addTotalCriteriaToWhere'
import { dexie, Kultur } from '../../../../../dexieClient'

const buildExceljsWorksheetsForKulturBedarfsplanung = async ({
  store,
  workbook,
}) => {
  const gartens = await collectionFromTable({
    table: 'garten',
    where: addTotalCriteriaToWhere({ table: 'garten', store }),
  }).toArray()
  const gartenIds = gartens.map((g) => g.id)
  const kulturs = await dexie.kulturs
    .where('[garten_id+__aktiv_indexable+__deleted_indexable]')
    .anyOf(gartenIds.map((id) => [id, 1, 0]))
    .toArray()
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  const kultursData = await Promise.all(
    kultursSorted.map(async (kultur: Kultur) => {
      const kulturLabel = await kultur.label?.()
      const art = await kultur.art?.()
      const artname = await art?.label?.()
      const herkunft = await kultur.herkunft?.()
      const garten = await kultur.garten?.()
      const garten_label = await garten.label?.()
      const zaehlungsOfKultur = await collectionFromTable({
        table: 'zaehlung',
        where: addTotalCriteriaToWhere({
          table: 'zaehlung',
          store,
          where: { kultur_id: kultur.id },
        }),
      }).toArray()
      const idsOfZaehlungsOfKultur = zaehlungsOfKultur.map((z) => z.id)
      const tzsWithAnzahlPflanzen = await dexie.teilzaehlungs
        .where('[zaehlung_id+__deleted_indexable]')
        .anyOf(idsOfZaehlungsOfKultur.map((id) => [id, 0]))
        .filter((t) => exists(t.anzahl_pflanzen))
        .toArray()
      const idsOfZaehlungsWithTzsWithAnzahlPflanzen = [
        ...new Set(tzsWithAnzahlPflanzen.map((t) => t.zaehlung_id)),
      ]
      const ownZaehlungen = await dexie.zaehlungs
        .where('[id+kultur_id+__deleted_indexable]')
        .anyOf(
          idsOfZaehlungsWithTzsWithAnzahlPflanzen.map((id) => [
            id,
            kultur.id,
            0,
          ]),
        )
        .toArray()
      const ownZaehlungenSorted = ownZaehlungen.sort(zaehlungSort)
      const lastZaehlung = ownZaehlungenSorted[ownZaehlungenSorted.length - 1]
      const lZTeilzaehlungs = lastZaehlung
        ? await collectionFromTable({
            table: 'teilzaehlung',
            where: addTotalCriteriaToWhere({
              table: 'teilzaehlung',
              store,
              where: { zaehlung_id: lastZaehlung.id },
            }),
          }).toArray()
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

      const ownAusLieferungsGeplant = await collectionFromTable({
        table: 'lieferung',
        where: addTotalCriteriaToWhere({
          table: 'lieferung',
          store,
          where: { von_kultur_id: kultur.id, __geplant_indexable: 1 },
        }),
      })
        .filter((l) => !!l.datum && exists(l.anzahl_pflanzen))
        .toArray()

      const ownAusLieferungenUnsorted = await collectionFromTable({
        table: 'lieferung',
        where: addTotalCriteriaToWhere({
          table: 'lieferung',
          store,
          where: { von_kultur_id: kultur.id, __geplant_indexable: 0 },
        }),
      })
        .filter((l) => !!l.datum && exists(l.anzahl_pflanzen))
        .toArray()

      const ownAusLieferungen = ownAusLieferungenUnsorted.sort(lieferungSort)
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
      const auslSinceWithAnzahlAuspflanzungsbereit =
        auslSinceLastZaehlung.filter((l) => exists(l.anzahl_auspflanzbereit))
      const auslSinceAnzahlAuspflanzbereit =
        auslSinceWithAnzahlAuspflanzungsbereit.length
          ? sumBy(
              auslSinceWithAnzahlAuspflanzungsbereit,
              'anzahl_auspflanzbereit',
            )
          : ''
      const auslSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_mutterpflanzen),
      )
      const auslSinceAnzahlMutterpflanzen =
        auslSinceWithAnzahlMutterpflanzen.length
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

      const ownAnLieferungenUnsorted = await collectionFromTable({
        table: 'lieferung',
        where: addTotalCriteriaToWhere({
          table: 'lieferung',
          store,
          where: { nach_kultur_id: kultur.id, __geplant_indexable: 0 },
        }),
      })
        .filter((l) => !!l.datum && exists(l.anzahl_pflanzen))
        .toArray()
      const ownAnLieferungen = ownAnLieferungenUnsorted.sort(lieferungSort)

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
      const anlSinceAnzahlAuspflanzbereit =
        anlSinceWithAnzahlAuspflanzungsbereit.length
          ? sumBy(
              anlSinceWithAnzahlAuspflanzungsbereit,
              'anzahl_auspflanzbereit',
            )
          : ''
      const anlSinceWithAnzahlMutterpflanzen = lZTeilzaehlungs.filter((l) =>
        exists(l.anzahl_mutterpflanzen),
      )
      const anlSinceAnzahlMutterpflanzen =
        anlSinceWithAnzahlMutterpflanzen.length
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
        label: kulturLabel,
        artname,
        herkunft_id: kultur.herkunft_id,
        herkunft_nr: herkunft?.nr ?? '',
        herkunft_label: herkunftLabelFromHerkunft({ herkunft }),
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
        auslieferungen_geplant: ownAusLieferungsGeplant
          .sort(lieferungSort)
          .map(
            (l) =>
              `${format(new Date(l.datum), 'yyyy.MM.dd')}: ${
                l.anzahl_pflanzen ?? 0
              } Pflanzen${
                exists(l.anzahl_auspflanzbereit)
                  ? `, ${l.anzahl_auspflanzbereit} auspflanzbereit`
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

  addWorksheetToExceljsWorkbook({
    workbook,
    title: `Kulturen für Bedarfsplanung`,
    data: kultursData,
  })

  return
}

export default buildExceljsWorksheetsForKulturBedarfsplanung
