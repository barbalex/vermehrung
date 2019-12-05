// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import gql from 'graphql-tag'
import get from 'lodash/get'
import fileSaver from 'file-saver'
import format from 'date-fns/format'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'

export default async ({ client, store, kultur_id }) => {
  const { enqueNotification } = store

  const workbook = new ExcelJs.Workbook()

  // 1. Get Kultur
  let kulturResult
  try {
    kulturResult = await client.query({
      query: gql`
        query GetKulturForKulturDownload($id: bigint!) {
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
  const kultur = { ...get(kulturResult, 'data.kultur[0]') }
  kultur.art_id = get(kultur, 'art.art_ae_art.id', '')
  kultur.art_name = get(kultur, 'art.art_ae_art.name', '')
  kultur.herkunft_id = get(kultur, 'herkunft.id', '')
  kultur.herkunft_nr = get(kultur, 'herkunft.nr', '')
  kultur.garten_id = get(kultur, 'garten.id', '')
  kultur.garten_name = get(kultur, 'garten.name', '')
  delete kultur.art
  delete kultur.herkunft
  delete kultur.garten
  delete kultur.__typename
  addWorksheetToExceljsWorkbook({
    workbook,
    title: 'Kultur',
    data: [kultur],
  })
  // 2. Get Zählungen
  let zaehlungResult
  try {
    zaehlungResult = await client.query({
      query: gql`
        query GetZaehlungForKulturDownload($id: bigint!) {
          zaehlung(where: { kultur_id: { _eq: $id } }) {
            id
            kultur_id
            datum
            ziel
            prognose
            bemerkungen
            teilzaehlungs_aggregate {
              aggregate {
                count
                sum {
                  anzahl_pflanzen
                  anzahl_auspflanzbereit
                  anzahl_mutterpflanzen
                }
              }
              nodes {
                id
                teilkultur {
                  id
                  name
                }
                andere_menge
              }
            }
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
  const zaehlungenArray = get(zaehlungResult, 'data.zaehlung') || []
  const zaehlungen = zaehlungenArray.map(z => {
    z.teilzaehlungen_anzahl = get(
      z,
      'teilzaehlungs_aggregate.aggregate.count',
      '',
    )
    z.teilzaehlungen_anzahl_pflanzen = get(
      z,
      'teilzaehlungs_aggregate.aggregate.anzahl_pflanzen',
      '',
    )
    z.teilzaehlungen_anzahl_auspflanzbereit = get(
      z,
      'teilzaehlungs_aggregate.aggregate.anzahl_auspflanzbereit',
      '',
    )
    z.teilzaehlungen_anzahl_mutterpflanzen = get(
      z,
      'teilzaehlungs_aggregate.aggregate.anzahl_mutterpflanzen',
      '',
    )
    const tknodes = get(z, 'teilzaehlungs_aggregate.nodes') || []
    z.teilzaehlungen_ids = tknodes
      .filter(tk => !!get(tk, 'id'))
      .map(tk => get(tk, 'id'))
      .join(', ')
    z.teilzaehlungen_teilkulturen = tknodes
      .filter(tk => !!get(tk, 'teilkultur.name'))
      .map(tk => get(tk, 'teilkultur.name'))
      .join(', ')
    z.teilzaehlungen_andere_mengen = tknodes
      .filter(tk => !!get(tk, 'andere_menge'))
      .map(tk => get(tk, 'andere_menge'))
      .join(', ')
    delete z.teilzaehlungs_aggregate
    delete z.__typename
    return z
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: 'Zaehlungen',
    data: zaehlungen,
  })
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
  const file = `Kultur_${kultur_id}_${format(
    new Date(),
    'yyyy-MM-dd_HH-mm-ss',
  )}`
  fileSaver.saveAs(
    new Blob([buffer], { type: 'application/octet-stream' }),
    `${file}.xlsx`,
  )
}
