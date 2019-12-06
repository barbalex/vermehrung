import gql from 'graphql-tag'
import get from 'lodash/get'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'
import buildExceljsWorksheetsForKultur from '../Kultur/buildExceljsWorksheets'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({
  client,
  store,
  garten_id,
  workbook,
  calledFromHigherUp,
}) => {
  const { enqueNotification } = store

  // 1. Get Garten
  let gartenResult
  try {
    gartenResult = await client.query({
      query: gql`
        query GetGartenForGartenDownload($id: bigint!) {
          garten(where: { id: { _eq: $id } }) {
            id
            name
            person_id
            person {
              id
              name
            }
            strasse
            plz
            ort
            aktiv
            bemerkungen
            computed {
              id
              lv95_x
              lv95_y
              wgs84_lat
              wgs84_long
            }
          }
        }
      `,
      variables: {
        id: garten_id,
      },
    })
  } catch (error) {
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const garten = { ...get(gartenResult, 'data.garten[0]') }
  garten.person_name = get(garten, 'person.name', '')
  delete garten.person
  garten.lv95_x = get(garten, 'computed.lv95_x', '')
  garten.lv95_y = get(garten, 'computed.lv95_y', '')
  garten.wgs84_lat = get(garten, 'computed.wgs84_lat', '')
  garten.wgs84_long = get(garten, 'computed.wgs84_long', '')
  delete garten.computed
  delete garten.__typename
  addWorksheetToExceljsWorkbook({
    workbook,
    title: calledFromHigherUp ? `Garten_${garten_id}` : 'Garten',
    data: [garten],
  })
  // 2. Get Kulturen
  let kulturResult
  try {
    kulturResult = await client.query({
      query: gql`
        query GetKultursForGartenDownload($id: bigint!) {
          kultur(where: { garten_id: { _eq: $id } }, order_by: { id: asc }) {
            id
            art_id
            art {
              id
              art_ae_art {
                id
                name
              }
            }
            herkunft_id
            herkunft {
              id
              nr
            }
            garten_id
            garten {
              id
              name
            }
            zwischenlager
            erhaltungskultur
            von_anzahl_individuen
            aktiv
            bemerkungen
          }
        }
      `,
      variables: {
        id: garten_id,
      },
    })
  } catch (error) {
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const kultursArray = get(kulturResult, 'data.kultur') || []
  const kulturs = kultursArray.map(k => {
    k.art_ae_id = get(k, 'art.art_ae_art.id', '')
    k.art_ae_name = get(k, 'art.art_ae_art.name', '')
    delete k.art
    k.herkunft_id = get(k, 'herkunft.id', '')
    k.herkunft_nr = get(k, 'herkunft.nr', '')
    delete k.herkunft
    k.garten_id = get(k, 'garten.id', '')
    k.garten_name = get(k, 'garten.name', '')
    delete k.garten
    delete k.__typename
    return k
  })
  if (kulturs.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Garten_${garten_id}_Kulturen` : 'Kulturen',
      data: kulturs,
    })
    // 3. for all kulturen, call Kultur/buildExceljsWorksheets
    const myKulturIds = kulturs.map(k => k.id)
    for (const kultur_id of myKulturIds) {
      await buildExceljsWorksheetsForKultur({
        client,
        store,
        kultur_id,
        workbook,
        calledFromHigherUp: true,
      })
    }
  }
  return
}
