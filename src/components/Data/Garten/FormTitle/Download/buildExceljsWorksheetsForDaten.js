import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook.js'
import buildExceljsWorksheetsForKultur from '../../../Kultur/FormTitle/buildExceljsWorksheets.js'
import removeMetadataFromDataset from '../../../../../utils/removeMetadataFromDataset.js'
import { kultursSortedFromKulturs } from '../../../../../utils/kultursSortedFromKulturs.js'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
const buildExceljsWorksheetsForDaten = async ({
  store,
  garten_id,
  workbook,
  calledFromHigherUp,
}) => {
  const { db } = store

  // 1. Get Garten
  let garten
  try {
    garten = await db.get('garten').find(garten_id)
  } catch {}
  let person
  try {
    person = await garten?.person?.fetch()
  } catch {}
  const newGarten = {
    id: garten.id,
    name: garten.name,
    person_id: garten.person_id,
    person_name: person?.fullname ?? '',
    person_rohdaten: removeMetadataFromDataset({
      dataset: person?._raw,
      foreignKeys: [],
    }),
    strasse: garten.strasse,
    plz: garten.plz,
    ort: garten.ort,
    geom_point: garten.geom_point,
    wgs84_lat: garten.wgs84_lat,
    wgs84_long: garten.wgs84_long,
    lv95_x: garten.lv95_x,
    lv95_y: garten.lv95_y,
    aktiv: garten.aktiv,
    bemerkungen: garten.bemerkungen,
    changed: garten.changed,
    changed_by: garten.changed_by,
  }
  addWorksheetToExceljsWorkbook({
    workbook,
    title: calledFromHigherUp ? `Garten_${garten_id}` : 'Garten',
    data: [newGarten],
  })
  // 2. Get Kulturen
  let kultursOfGarten = []
  try {
    kultursOfGarten = await db
      .get('kultur')
      .query(
        Q.where('_deleted', false),
        Q.where('aktiv', true),
        Q.where('garten_id', garten_id),
      )
      .fetch()
  } catch {}
  const kultursOfGartenSorted = await kultursSortedFromKulturs(kultursOfGarten)
  const kulturData = await Promise.all(
    kultursOfGartenSorted.map(async (kultur) => {
      let art
      try {
        art = await kultur.art?.fetch()
      } catch {}
      let artLabel
      try {
        artLabel = await art?.label?.pipe(first$()).toPromise()
      } catch {}
      let aeArt
      try {
        aeArt = await art?.ae_art?.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await kultur.herkunft?.fetch()
      } catch {}
      let garten
      try {
        garten = await kultur.garten?.fetch()
      } catch {}

      const newK = {
        id: kultur.id,
        art_id: kultur.art_id,
        art_set: art?.set ?? '',
        art_ae_id: aeArt?.id ?? '',
        art_ae_name: artLabel,
        herkunft_id: kultur.herkunft_id,
        herkunft_nr: herkunft?.nr ?? '',
        herkunft_rohdaten: removeMetadataFromDataset({
          dataset: herkunft?._raw,
          foreignKeys: ['sammlungs'],
        }),
        garten_id: kultur.garten_id,
        garten_name: garten?.name ?? '',
        garten_rohdaten: removeMetadataFromDataset({
          dataset: garten?._raw,
          foreignKeys: ['kulturs', 'person'],
        }),
        zwischenlager: kultur.zwischenlager,
        erhaltungskultur: kultur.erhaltungskultur,
        von_anzahl_individuen: kultur.von_anzahl_individuen,
        bemerkungen: kultur.bemerkungen,
        aktiv: kultur.aktiv,
        changed: kultur.changed,
        changed_by: kultur.changed_by,
      }
      return newK
    }),
  )
  if (kulturData.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Garten_${garten_id}_Kulturen` : 'Kulturen',
      data: kulturData,
    })
    // 3. for all kulturen, call Kultur/buildExceljsWorksheets
    const myKulturIds = kulturData.map((k) => k.id)
    // need to pass index
    // as explained in https://stackoverflow.com/a/34349073/712005
    // because excel limits length of names and uuid is too long
    for (const [index, kultur_id] of [myKulturIds].entries()) {
      await buildExceljsWorksheetsForKultur({
        store,
        kultur_id: kultur_id[0],
        kultur_name: index + 1,
        workbook,
        calledFromHigherUp: true,
      })
    }
  }
  return
}

export default buildExceljsWorksheetsForDaten
