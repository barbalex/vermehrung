import { Q } from 'nitromelondb'
import { store, dbAtom, setExportProgress } from '../../../../../store/index.ts'
import { first as first$ } from 'rxjs/operators'
import type { Sheet } from 'write-excel-file/browser'

import { addSheetToSheets } from '../../../../../utils/addSheetToSheets.ts'
import { buildSheetsForKultur } from '../../../Kultur/FormTitle/buildSheets.ts'
import { removeMetadataFromDataset } from '../../../../../utils/removeMetadataFromDataset.ts'
import { kultursSortedFromKulturs } from '../../../../../utils/kultursSortedFromKulturs.ts'

/**
 * this function can be used from higher up
 * that is why it receives sheets and _can_ receive calledFromHigherUp
 */
export const buildSheetsForDaten = async ({
  garten_id,
  sheets,
  calledFromHigherUp,
}: {
  garten_id: string
  sheets: Sheet<Blob>[]
  calledFromHigherUp: boolean
}) => {
  const db = store.get(dbAtom)
  setExportProgress({ message: 'Garten wird geladen' })

  // 1. Get Garten
  let garten: import('../../../../../dbModel.ts').Garten | undefined
  try {
    garten = await db
      ?.get<import('../../../../../dbModel.ts').Garten>('garten')
      .find(garten_id)
  } catch {}
  let person
  try {
    person = await garten?.person?.fetch()
  } catch {}
  const newGarten = {
    id: garten?.id,
    name: garten?.name,
    person_id: garten?.person_id,
    person_name: person?.fullname ?? '',
    person_rohdaten: removeMetadataFromDataset({
      dataset: person?._raw,
      foreignKeys: [],
    }),
    strasse: garten?.strasse,
    plz: garten?.plz,
    ort: garten?.ort,
    geom_point: garten?.geom_point,
    wgs84_lat: garten?.wgs84_lat,
    wgs84_long: garten?.wgs84_long,
    lv95_x: garten?.lv95_x,
    lv95_y: garten?.lv95_y,
    aktiv: garten?.aktiv,
    bemerkungen: garten?.bemerkungen,
    changed: garten?.changed,
    changed_by: garten?.changed_by,
  }
  addSheetToSheets({
    sheets,
    title: calledFromHigherUp ? `Garten_${garten_id}` : 'Garten',
    data: [newGarten],
  })
  // 2. Get Kulturen
  let kultursOfGarten: import('../../../../../dbModel.ts').Kultur[] = []
  try {
    kultursOfGarten =
      (await db
        ?.get<import('../../../../../dbModel.ts').Kultur>('kultur')
        .query(
          Q.where('_deleted', false),
          Q.where('aktiv', true),
          Q.where('garten_id', garten_id),
        )
        .fetch()) ?? []
  } catch {}
  const kultursOfGartenSorted = await kultursSortedFromKulturs(kultursOfGarten)
  setExportProgress({ message: 'Kulturen des Gartens werden aufbereitet' })
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
        art_apflora_av: art?.apflora_av ?? '',
        art_apflora_ap: art?.apflora_ap ?? '',
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
    addSheetToSheets({
      sheets,
      title: calledFromHigherUp ? `Garten_${garten_id}_Kulturen` : 'Kulturen',
      data: kulturData,
    })
    // 3. for all kulturen, call Kultur/buildSheets
    const myKulturIds = kulturData.map((k) => k.id)
    // need to pass index
    // as explained in https://stackoverflow.com/a/34349073/712005
    // because excel limits length of names and uuid is too long
    // build the sheets per kultur concurrently, each into own array
    // so the sheet order follows the kulturen when appending
    let kulturenDone = 0
    const kulturSheetsArrays = await Promise.all(
      myKulturIds.map(async (kultur_id, index) => {
        const kulturSheets: Sheet<Blob>[] = []
        await buildSheetsForKultur({
          kultur_id,
          kultur_name: index + 1,
          sheets: kulturSheets,
          calledFromHigherUp: true,
        })
        kulturenDone += 1
        setExportProgress({
          message: 'Kulturen werden exportiert',
          done: kulturenDone,
          total: myKulturIds.length,
        })
        return kulturSheets
      }),
    )
    sheets.push(...kulturSheetsArrays.flat())
  }
  return
}
