import format from 'date-fns/format'
import sumBy from 'lodash/sumBy'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import artLabelFromArt from '../../../../../utils/artLabelFromArt'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'
import exists from '../../../../../utils/exists'
import kulturLabelFromKultur from '../../../../../utils/kulturLabelFromKultur'

const buildExceljsWorksheetsForKulturBedarfsplanung = async ({
  store,
  workbook,
}) => {
  const {
    kultursSorted,
    zaehlungsSorted,
    teilzaehlungsSorted,
    lieferungsSorted,
  } = store

  const kulturs = kultursSorted
    .filter((kultur) => {
      if (!kultur.aktiv) return false
      if (kultur._deleted) return false
      const garten = store.gartens.get(kultur.garten_id)
      if (!garten) return false
      if (!garten?.aktiv) return false
      if (garten?._deleted) return false
      return true
    })
    .map((kultur) => {
      const art = kultur.art_id ? store.arts.get(kultur.art_id) : {}
      //const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
      const herkunft = kultur?.herkunft_id
        ? store.herkunfts.get(kultur.herkunft_id)
        : {}
      const garten = kultur?.garten_id
        ? store.gartens.get(kultur.garten_id)
        : {}

      const ownZaehlungen = zaehlungsSorted.filter(
        (z) => z.kultur_id === kultur.id,
      )
      const lastZaehlung = ownZaehlungen[ownZaehlungen.length - 1]
      const lZTeilzaehlungs = lastZaehlung
        ? teilzaehlungsSorted.filter((t) => t.zaehlung_id === lastZaehlung.id)
        : []

      // TODO: sumBy returns 0 when field was undefined!
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
          : '(Berechnungsgrundlage fehlt)'

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
        exists(letzte_lieferung_anzahl_pflanzen) &&
        (exists(letzte_lieferung_anzahl_auspflanzbereit) ||
          exists(letzte_lieferung_anzahl_mutterpflanzen))
          ? letzte_lieferung_anzahl_pflanzen -
            (letzte_lieferung_anzahl_auspflanzbereit ?? 0) -
            (letzte_lieferung_anzahl_mutterpflanzen ?? 0)
          : lastAusLieferung && exists(letzte_lieferung_anzahl_pflanzen)
          ? '(Berechnungsgrundlage fehlt)'
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
        letzte_zaehlung_datum: lastZaehlung?.datum
          ? format(new Date(lastZaehlung.datum), 'yyyy.MM.dd')
          : '',
        letzte_zaehlung_prognose: lastZaehlung?.prognose ?? '',
        letzte_zaehlung_bemerkungen: lastZaehlung?.bemerkungen ?? '',
        letzte_zaehlung_anzahl_pflanzen: anzahl_pflanzen,
        letzte_zaehlung_anzahl_auspflanzbereit: anzahl_auspflanzbereit,
        letzte_zaehlung_anzahl_mutterpflanzen: anzahl_mutterpflanzen,
        letzte_zaehlung_anzahl_jungpflanzen: anzahl_jungpflanzen,
        letzte_lieferung_datum: lastAusLieferung?.datum
          ? format(new Date(lastAusLieferung.datum), 'yyyy.MM.dd')
          : '',
        letzte_lieferung_anzahl_pflanzen,
        letzte_lieferung_anzahl_auspflanzbereit,
        letzte_lieferung_anzahl_mutterpflanzen,
        letzte_lieferung_anzahl_jungpflanzen,
      }

      return row
    })

  addWorksheetToExceljsWorkbook({
    workbook,
    title: `Kulturen für Bedarfsplanung`,
    data: kulturs,
  })

  return
}

export default buildExceljsWorksheetsForKulturBedarfsplanung
