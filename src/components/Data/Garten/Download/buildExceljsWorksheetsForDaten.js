import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import buildExceljsWorksheetsForKultur from '../../Kultur/buildExceljsWorksheets'

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
  garten.person_name = garten?.person?.name ?? ''
  delete garten.person
  delete garten.__typename
  delete garten._conflicts
  delete garten._deleted
  delete garten._depth
  delete garten._rev
  delete garten._parent_rev
  delete garten._revisions
  delete garten.garten_files_aggregate
  delete garten.kultur_revs
  delete garten.kultur_revs_aggregate
  delete garten.kulturs
  addWorksheetToExceljsWorkbook({
    workbook,
    title: calledFromHigherUp ? `Garten_${garten_id}` : 'Garten',
    data: [garten],
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
