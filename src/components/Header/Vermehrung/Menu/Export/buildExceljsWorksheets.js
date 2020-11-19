import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import { DateTime } from 'luxon'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import artLabelFromLieferung from '../../../../../utils/artLabelFromLieferung'
import sammlungLabelFromSammlung from '../../../../../utils/sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../../../../../utils/kulturLabelFromKultur'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'

const buildExceljsWorksheets = ({ store, year }) => {
  const workbook = new ExcelJs.Workbook()
  const { lieferungsFiltered } = store

  const lieferungs = lieferungsFiltered
    .filter((l) => {
      if (!l.datum) return false
      const lYear = DateTime.fromSQL(l.datum).toFormat('yyyy')
      return lYear == year
    })
    .map((l) => {
      const lieferungPerson = l.person_id ? store.persons.get(l.person_id) : {}
      const vonSammlung = l?.von_sammlung_id
        ? store.sammlungs.get(l.von_sammlung_id)
        : {}
      const vonSammlungPerson = vonSammlung?.person_id
        ? store.persons.get(vonSammlung?.person_id)
        : {}
      const vonSammlungHerkunft = vonSammlung?.herkunft_id
        ? store.herkunfts.get(vonSammlung?.herkunft_id)
        : {}
      const vonKultur = l?.kultur_id ? store.kulturs.get(l.kultur_id) : {}
      const vonKulturGarten = vonKultur?.garten_id
        ? store.gartens.get(vonKultur.garten_id)
        : {}
      const vonKulturHerkunft = vonKultur.herkunft_id
        ? store.herkunfts.get(vonKultur.herkunft_id)
        : {}
      const nachKultur = l.nach_kultur_id
        ? store.kulturs.get(l.nach_kultur_id)
        : {}
      const nachKulturGarten = nachKultur.garten_id
        ? store.gartens.get(nachKultur.garten_id)
        : {}
      const nachKulturHerkunft = nachKultur.herkunft_id
        ? store.herkunfts.get(nachKultur.herkunft_id)
        : {}

      return {
        id: l.id,
        sammel_lieferung_id: l.sammel_lieferung_id,
        art_id: l.art_id,
        art_label: artLabelFromLieferung({ lieferung: l, store }),
        person_id: l.person_id,
        person_label: personLabelFromPerson({ person: lieferungPerson, store }),
        von_sammlung_id: l.von_sammlung_id,
        von_sammlung_label: sammlungLabelFromSammlung({
          sammlung: vonSammlung,
          store,
        }),
        von_sammlung_datum: vonSammlung?.datum ?? '',
        von_sammlung_herkunft_id: vonSammlung?.herkunft_id ?? '',
        von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr ?? '',
        von_sammlung_person_id: vonSammlung?.person_id ?? '',
        von_sammlung_person_name: vonSammlungPerson?.fullname ?? '',
        von_kultur_id: l.von_kultur_id,
        von_kultur_label: kulturLabelFromKultur({ kultur: vonKultur, store }),
        von_kultur_garten_id: vonKultur?.garten_id ?? '',
        von_kultur_garten_label: gartenLabelFromGarten({
          garten: vonKulturGarten,
          store,
        }),
        von_kultur_herkunft_id: vonKultur?.herkunft_id ?? '',
        von_kultur_herkunft_label: herkunftLabelFromHerkunft({
          herkunft: vonKulturHerkunft,
        }),
        von_kultur_herkunft_nr: vonKulturHerkunft?.nr ?? '',
        datum: l.datum,
        nach_kultur_id: l.nach_kultur_id,
        nach_kultur_label: kulturLabelFromKultur({ kultur: nachKultur, store }),
        nach_kultur_garten_id: nachKultur?.garten_id ?? '',
        nach_kultur_garten_label: gartenLabelFromGarten({
          garten: nachKulturGarten,
          store,
        }),
        nach_kultur_garten_name: nachKulturGarten?.name ?? '',
        nach_kultur_herkunft_id: nachKultur?.herkunft_id ?? '',
        nach_kultur_herkunft_nr: nachKulturHerkunft?.nr ?? '',
        nach_ausgepflanzt: l.nach_ausgepflanzt,
        von_anzahl_individuen: l.von_anzahl_individuen,
        anzahl_pflanzen: l.anzahl_pflanzen,
        anzahl_auspflanzbereit: l.anzahl_auspflanzbereit,
        gramm_samen: l.gramm_samen,
        andere_menge: l.andere_menge,
        geplant: l.geplant,
        bemerkungen: l.bemerkungen,
        changed: l.changed,
        changed_by: l.changed_by,
      }
    })
  if (lieferungs.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: `Lieferungen ${year}`,
      data: lieferungs,
    })
  }
  downloadExceljsWorkbook({ store, fileName: `Lieferungen_${year}`, workbook })
}

export default buildExceljsWorksheets
