// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import gql from 'graphql-tag'
import get from 'lodash/get'
import fileSaver from 'file-saver'
import format from 'date-fns/format'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'

export default async ({ client, store, kultur_id }) => {
  const { enqueNotification } = store
  console.log('download', { kultur_id })

  const workbook = new ExcelJs.Workbook()

  // 1. Get Kultur
  let kulturResult
  try {
    kulturResult = await client.query({
      query: gql`
        query GetKulturForDownload($id: bigint!) {
          kultur(where: { id: { _eq: $id } }) {
            id
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
        id: kultur_id,
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
  const kultur = get(kulturResult, 'data.kultur[0]')
  console.log('download', { kultur })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: 'Kultur',
    data: get(kulturResult, 'data.kultur'),
  })
  // 2. Get Zählungen
  // 3. Get An-Lieferungen
  // 4. Get Aus-Lieferungen
  // 5. Get Events

  let buffer
  try {
    buffer = await workbook.xlsx.writeBuffer()
  } catch (error) {
    return store.enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const file = `Kultur_${kultur.id}_${format(
    new Date(),
    'yyyy-MM-dd_HH-mm-ss',
  )}`
  fileSaver.saveAs(
    new Blob([buffer], { type: 'application/octet-stream' }),
    `${file}.xlsx`,
  )
}
