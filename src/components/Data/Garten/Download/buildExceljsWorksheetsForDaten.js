import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import buildExceljsWorksheetsForKultur from '../../Kultur/buildExceljsWorksheets'
import removeMetadataFromDataset from '../../../../utils/removeMetadataFromDataset'
import checkForOnlineError from '../../../../utils/checkForOnlineError'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({ store, garten_id, workbook, calledFromHigherUp }) => {
  const { addNotification } = store

  // 1. Get Garten
  let gartenResult
  try {
    gartenResult = await store.queryGarten(
      { where: { id: { _eq: garten_id } } },
      (g) =>
        g.id.name.person_id.person((p) => p.id.name).strasse.plz.ort.aktiv
          .bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long,
    )
  } catch (error) {
    checkForOnlineError(error)
    return addNotification({
      message: error.message,
    })
  }
  const garten = { ...gartenResult?.garten?.[0] }
  const newGarten = {
    id: garten.id,
    name: garten.name,
    person_id: garten.person_id,
    person_name: garten?.person?.name ?? '',
    person_rohdaten: removeMetadataFromDataset({
      dataset: garten?.person,
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
  let kulturResult
  try {
    kulturResult = await store.queryKultur(
      { where: { garten_id: { _eq: garten_id } }, order_by: { id: 'asc' } },
      (k) =>
        k.id.art_id
          .art((a) => a.id.art_ae_art((ae) => ae.id.name))
          .herkunft_id.herkunft((h) => h.id.nr)
          .garten_id.garten((g) => g.id.name).zwischenlager.erhaltungskultur
          .von_anzahl_individuen.aktiv.bemerkungen,
    )
  } catch (error) {
    checkForOnlineError(error)
    return addNotification({
      message: error.message,
    })
  }
  const kultursArray = kulturResult?.kultur ?? []
  const kulturs = kultursArray.map((kultur) => {
    const newK = {
      id: kultur.id,
      art_id: kultur.art_id,
      art_ae_id: kultur?.art?.art_ae_art?.id ?? '',
      art_ae_name: kultur?.art?.art_ae_art?.name ?? '',
      herkunft_id: kultur.herkunft_id,
      herkunft_nr: kultur?.herkunft?.nr ?? '',
      herkunft_rohdaten: removeMetadataFromDataset({
        dataset: kultur?.herkunft,
        foreignKeys: ['sammlungs'],
      }),
      garten_id: kultur.garten_id,
      garten_name: kultur?.garten?.name ?? '',
      garten_rohdaten: removeMetadataFromDataset({
        dataset: kultur?.garten,
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
  })
  if (kulturs.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Garten_${garten_id}_Kulturen` : 'Kulturen',
      data: kulturs,
    })
    // 3. for all kulturen, call Kultur/buildExceljsWorksheets
    const myKulturIds = kulturs.map((k) => k.id)
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
