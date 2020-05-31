import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import buildExceljsWorksheetsForKultur from '../../Kultur/buildExceljsWorksheets'
import removeMetadataFromDataset from '../../../../utils/removeMetadataFromDataset'

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
    return addNotification({
      message: error.message,
    })
  }
  const kultursArray = kulturResult?.kultur ?? []
  console.log('buildExcel', { kultursArray, kulturResult })
  const kulturs = kultursArray.map((kModel) => {
    //const k = kModel.toJSON()
    const k = { ...kModel }
    console.log(k)
    k.art_ae_id = kModel?.art.art_ae_art?.id ?? ''
    k.art_ae_name = kModel?.art.art_ae_art?.name ?? ''
    delete k.art
    k.herkunft_id = kModel?.herkunft?.id ?? ''
    k.herkunft_nr = kModel?.herkunft?.nr ?? ''
    delete k.herkunft
    k.garten_id = kModel?.garten?.id ?? ''
    k.garten_name = kModel?.garten?.name ?? ''
    delete k.garten
    delete k.__typename
    delete k._conflicts
    delete k._deleted
    delete k._depth
    delete k._rev
    delete k._parent_rev
    delete k._revisions
    return k
  })
  if (kulturs.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Garten_${garten_id}_Kulturen` : 'Kulturen',
      data: kulturs,
    })
    // 3. for all kulturen, call Kultur/buildExceljsWorksheets
    const myKulturIds = kulturs.map((k) => k.id)
    for (const kultur_id of myKulturIds) {
      await buildExceljsWorksheetsForKultur({
        store,
        kultur_id,
        workbook,
        calledFromHigherUp: true,
      })
    }
  }
  return
}
