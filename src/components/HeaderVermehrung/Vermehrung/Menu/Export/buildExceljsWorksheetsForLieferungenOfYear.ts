import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import { DateTime } from 'luxon'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'
import lieferungSort from '../../../../../utils/lieferungSort'
import { Lieferung, Sammlung, Kultur } from '../../../../../dexieClient'
import collectionFromTable from '../../../../../utils/collectionFromTable'
import addTotalCriteriaToWhere from '../../../../../utils/addTotalCriteriaToWhere'

const buildExceljsWorksheetsForLieferungenOfYear = async ({ store, year }) => {
  const workbook = new ExcelJs.Workbook()

  const lieferungs: Lieferung[] = await collectionFromTable({
    table: 'lieferung',
    where: addTotalCriteriaToWhere({ store, table: 'lieferung' }),
  })
    .filter(
      (l) => !!l.datum && DateTime.fromSQL(l.datum).toFormat('yyyy') == year,
    )
    .toArray()
  const lieferungsSorted = lieferungs.sort(lieferungSort)

  const lieferungsdata = await Promise.all(
    lieferungsSorted.map(async (l) => {
      const lieferungPerson = await l?.person?.()
      const vonSammlung: Sammlung = await l.sammlung?.()
      const von_sammlung_label = await vonSammlung?.label?.()
      const vonSammlungPerson = await vonSammlung?.person?.()
      const vonSammlungHerkunft = await vonSammlung?.herkunft?.()
      const vonKultur: Kultur = await l.vonKultur?.()
      const von_kultur_label = await vonKultur?.label?.()
      const vonKulturGarten = await vonKultur?.garten?.()
      const von_kultur_garten_label = await vonKulturGarten?.label?.()
      const vonKulturHerkunft = await vonKultur?.herkunft?.()
      const nachKultur: Kultur = await l.nachKultur?.()
      const nach_kultur_label = await nachKultur?.label?.()
      const nachKulturGarten = await nachKultur?.garten?.()
      const nach_kultur_garten_label = nachKulturGarten?.label?.()
      const nachKulturHerkunft = await nachKultur?.herkunft?.()
      const art = await l.art?.()
      const art_label = await art?.label?.()

      return {
        id: l.id,
        sammel_lieferung_id: l.sammel_lieferung_id,
        art_id: l.art_id,
        art_label,
        person_id: l.person_id,
        person_label: personLabelFromPerson({
          person: lieferungPerson,
        }),
        von_sammlung_id: l.von_sammlung_id,
        von_sammlung_label,
        von_sammlung_datum: vonSammlung?.datum ?? '',
        von_sammlung_herkunft_id: vonSammlung?.herkunft_id ?? '',
        von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr ?? '',
        von_sammlung_person_id: vonSammlung?.person_id ?? '',
        von_sammlung_person_name: personLabelFromPerson({
          person: vonSammlungPerson,
        }),
        von_kultur_id: l.von_kultur_id,
        von_kultur_label,
        von_kultur_garten_id: vonKultur?.garten_id ?? '',
        von_kultur_garten_label,
        von_kultur_herkunft_id: vonKultur?.herkunft_id ?? '',
        von_kultur_herkunft_label: herkunftLabelFromHerkunft({
          herkunft: vonKulturHerkunft,
        }),
        von_kultur_herkunft_nr: vonKulturHerkunft?.nr ?? '',
        datum: l.datum,
        nach_kultur_id: l.nach_kultur_id,
        nach_kultur_label,
        nach_kultur_garten_id: nachKultur?.garten_id ?? '',
        nach_kultur_garten_label,
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
    }),
  )
  if (lieferungsdata.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: `Lieferungen ${year}`,
      data: lieferungsdata,
    })
  }
  downloadExceljsWorkbook({ store, fileName: `Lieferungen_${year}`, workbook })
}

export default buildExceljsWorksheetsForLieferungenOfYear
