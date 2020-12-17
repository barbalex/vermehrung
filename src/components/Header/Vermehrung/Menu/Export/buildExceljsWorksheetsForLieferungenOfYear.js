import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import { DateTime } from 'luxon'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import sammlungLabelFromSammlung from '../../../../../utils/sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../../../../../utils/kulturLabelFromKultur'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'
import lieferungSort from '../../../../../utils/lieferungSort'

const buildExceljsWorksheetsForLieferungenOfYear = async ({ store, year }) => {
  const { db } = store
  const workbook = new ExcelJs.Workbook()

  const lieferungs = await db.collections
    .get('lieferung')
    .query(Q.where('_deleted', false), Q.where('datum', Q.notEq(null)))
    .fetch()
  const lieferungsSorted = lieferungs.sort((a, b) => lieferungSort({ a, b }))

  const lieferungsdata = await Promise.all(
    lieferungsSorted
      .filter((l) => {
        const lYear = DateTime.fromSQL(l.datum).toFormat('yyyy')
        return lYear == year
      })
      .map(async (l) => {
        const lieferungPerson = await l.person?.fetch()
        const vonSammlung = await l.sammlung?.fetch()
        const vonSammlungPerson = await vonSammlung?.person?.fetch()
        const vonSammlungHerkunft = await vonSammlung?.herkunft?.fetch()
        const vonKultur = await l.von_kultur.pipe(first$()).toPromise()
        const vonKulturGarten = await vonKultur?.garten?.fetch()
        const vonKulturHerkunft = await vonKultur?.herkunft?.fetch()
        const nachKultur = await l.nach_kultur.pipe(first$()).toPromise()
        const nachKulturGarten = await nachKultur?.garten?.fetch()
        const nachKulturHerkunft = await nachKultur?.herkunft?.fetch()
        const art = await l.art?.fetch()
        const art_label = await art?.label.pipe(first$()).toPromise()

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
          // TODO: usw wm
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
          // TODO: use wm
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
          nach_kultur_label: kulturLabelFromKultur({
            kultur: nachKultur,
            store,
          }),
          nach_kultur_garten_id: nachKultur?.garten_id ?? '',
          // TODO: use wm
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
