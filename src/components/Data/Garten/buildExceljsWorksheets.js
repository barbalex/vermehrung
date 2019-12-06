import gql from 'graphql-tag'
import get from 'lodash/get'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'

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
  const garten = { ...get(gartenResult, 'data.garten[0]') }
  //kultur.art_ae_id = get(kultur, 'art.art_ae_art.id', '')
  //delete kultur.art
  delete garten.__typename
  addWorksheetToExceljsWorkbook({
    workbook,
    title: calledFromHigherUp ? `Garten_${garten_id}` : 'Garten',
    data: [garten],
  })
  // for all kulturen, call Kultur/buildExceljsWorksheets
  return
}
