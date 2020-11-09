import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'
import buildExceljsWorksheetsForKultur from '../../../Kultur/FormTitle/buildExceljsWorksheets'
import removeMetadataFromDataset from '../../../../../utils/removeMetadataFromDataset'
import artLabelFromKultur from '../../../../../utils/artLabelFromKultur'

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
  const { kultursSorted } = store

  // 1. Get Garten
  const garten = store.gartens.get(garten_id)
  const person = garten.person_id ? store.persons.get(garten.person_id) : {}
  const newGarten = {
    id: garten.id,
    name: garten.name,
    person_id: garten.person_id,
    person_name: person?.fullname ?? '',
    person_rohdaten: removeMetadataFromDataset({
      dataset: person,
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
  const kultursArray = kultursSorted.filter((k) => k.garten_id === garten_id)
  const kulturs = kultursArray.map((kultur) => {
    const art = kultur.art_id ? store.arts.get(kultur.art_id) : {}
    const aeArt = art.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const herkunft = kultur.herkunft_id
      ? store.herkunfts.get(kultur.herkunft_id)
      : {}
    const garten = kultur.garten_id ? store.gartens.get(kultur.garten_id) : {}
    const newK = {
      id: kultur.id,
      art_id: kultur.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromKultur({ kultur, store }),
      herkunft_id: kultur.herkunft_id,
      herkunft_nr: herkunft?.nr ?? '',
      herkunft_rohdaten: removeMetadataFromDataset({
        dataset: herkunft,
        foreignKeys: ['sammlungs'],
      }),
      garten_id: kultur.garten_id,
      garten_name: garten?.name ?? '',
      garten_rohdaten: removeMetadataFromDataset({
        dataset: garten,
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

export default buildExceljsWorksheetsForDaten
