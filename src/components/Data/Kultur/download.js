// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import gql from 'graphql-tag'
import get from 'lodash/get'
import fileSaver from 'file-saver'
import format from 'date-fns/format'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'

/**
 * this function cann be used from higher up
 * that is why it _can_ recieve a workbook
 */
export default async ({ client, store, kultur_id, workbook: wbPassed }) => {
  const { enqueNotification } = store

  const workbook = wbPassed || new ExcelJs.Workbook()

  // 1. Get Kultur
  let kulturResult
  try {
    kulturResult = await client.query({
      query: gql`
        query GetKulturForKulturDownload($id: bigint!) {
          kultur(where: { id: { _eq: $id } }) {
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
  kultur.art_ae_id = get(kultur, 'art.art_ae_art.id', '')
  kultur.art_ae_name = get(kultur, 'art.art_ae_art.name', '')
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
    title: wbPassed ? `Kultur_${kultur_id}` : 'Kultur',
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
    title: wbPassed ? `Kultur_${kultur_id}_Zaehlungen` : 'Zaehlungen',
    data: zaehlungen,
  })
  // 3. Get Teil-Zählungen
  let teilzaehlungResult
  try {
    teilzaehlungResult = await client.query({
      query: gql`
        query GetTeilzaehlungForKulturDownload($id: bigint!) {
          teilzaehlung(where: { zaehlung: { kultur_id: { _eq: $id } } }) {
            id
            zaehlung_id
            teilkultur_id
            teilkultur {
              id
              name
            }
            anzahl_pflanzen
            anzahl_auspflanzbereit
            anzahl_mutterpflanzen
            andere_menge
            auspflanzbereit_beschreibung
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
  const teilzaehlungenArray = get(teilzaehlungResult, 'data.teilzaehlung') || []
  const teilzaehlungen = teilzaehlungenArray.map(z => {
    z.teilkultur_name = get(z, 'teilkultur.name', '')
    delete z.teilkultur
    delete z.__typename
    return z
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: wbPassed ? `Kultur_${kultur_id}_Teilzaehlungen` : 'Teilzaehlungen',
    data: teilzaehlungen,
  })
  // 4. Get An-Lieferungen
  let anlieferungResult
  try {
    anlieferungResult = await client.query({
      query: gql`
        query GetAnlieferungForKulturDownload($id: bigint!) {
          lieferung(where: { nach_kultur_id: { _eq: $id } }) {
            id
            sammel_lieferung_id
            art_id
            art {
              id
              art_ae_art {
                id
                name
              }
            }
            person_id
            person {
              id
              name
            }
            von_sammlung_id
            von_sammlung: sammlung {
              id
              datum
              herkunft_id
              herkunft {
                id
                nr
              }
              person_id
              person {
                id
                name
              }
            }
            von_kultur_id
            kulturByVonKulturId {
              id
              garten_id
              garten {
                id
                name
              }
              herkunft_id
              herkunft {
                id
                nr
              }
            }
            datum
            nach_kultur_id
            kulturByNachKulturId {
              id
              garten_id
              garten {
                id
                name
              }
              herkunft_id
              herkunft {
                id
                nr
              }
            }
            nach_ausgepflanzt
            von_anzahl_individuen
            anzahl_pflanzen
            anzahl_auspflanzbereit
            gramm_samen
            andere_menge
            geplant
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
  const anlieferungenArray = get(anlieferungResult, 'data.lieferung') || []
  const anlieferungen = anlieferungenArray.map(z => {
    z.art_ae_id = get(z, 'art.art_ae_art.id', '')
    z.art_ae_name = get(z, 'art.art_ae_art.name', '')
    delete z.art
    z.person_name = get(z, 'person.name', '')
    delete z.person
    z.von_sammlung_datum = get(z, 'von_sammlung.datum', '')
    z.von_sammlung_herkunft_id = get(z, 'von_sammlung.herkunft_id', '')
    z.von_sammlung_herkunft_nr = get(z, 'von_sammlung.herkunft.nr', '')
    z.von_sammlung_person_id = get(z, 'von_sammlung.person_id', '')
    z.von_sammlung_person_name = get(z, 'von_sammlung.person.name', '')
    delete z.von_sammlung
    z.von_kultur_garten_id = get(z, 'kulturByVonKulturId.garten_id', '')
    z.von_kultur_garten_name = get(z, 'kulturByVonKulturId.garten.name', '')
    z.von_kultur_herkunft_id = get(z, 'kulturByVonKulturId.herkunft_id', '')
    z.von_kultur_herkunft_nr = get(z, 'kulturByVonKulturId.herkunft.nr', '')
    delete z.kulturByVonKulturId
    z.nach_kultur_garten_id = get(z, 'kulturByNachKulturId.garten_id', '')
    z.nach_kultur_garten_name = get(z, 'kulturByNachKulturId.garten.name', '')
    z.nach_kultur_herkunft_id = get(z, 'kulturByNachKulturId.herkunft_id', '')
    z.nach_kultur_herkunft_nr = get(z, 'kulturByNachKulturId.herkunft.nr', '')
    delete z.kulturByNachKulturId
    delete z.__typename
    return z
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: wbPassed ? `Kultur_${kultur_id}_Anlieferungen` : 'Anlieferungen',
    data: anlieferungen,
  })
  // 5. Get Aus-Lieferungen
  let auslieferungResult
  try {
    auslieferungResult = await client.query({
      query: gql`
        query GetAuslieferungForKulturDownload($id: bigint!) {
          lieferung(where: { von_kultur_id: { _eq: $id } }) {
            id
            sammel_lieferung_id
            art_id
            art {
              id
              art_ae_art {
                id
                name
              }
            }
            person_id
            person {
              id
              name
            }
            von_sammlung_id
            von_sammlung: sammlung {
              id
              datum
              herkunft_id
              herkunft {
                id
                nr
              }
              person_id
              person {
                id
                name
              }
            }
            von_kultur_id
            kulturByVonKulturId {
              id
              garten_id
              garten {
                id
                name
              }
              herkunft_id
              herkunft {
                id
                nr
              }
            }
            datum
            nach_kultur_id
            kulturByNachKulturId {
              id
              garten_id
              garten {
                id
                name
              }
              herkunft_id
              herkunft {
                id
                nr
              }
            }
            nach_ausgepflanzt
            von_anzahl_individuen
            anzahl_pflanzen
            anzahl_auspflanzbereit
            gramm_samen
            andere_menge
            geplant
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
  const auslieferungenArray = get(auslieferungResult, 'data.lieferung') || []
  const auslieferungen = auslieferungenArray.map(z => {
    z.art_ae_id = get(z, 'art.art_ae_art.id', '')
    z.art_ae_name = get(z, 'art.art_ae_art.name', '')
    delete z.art
    z.person_name = get(z, 'person.name', '')
    delete z.person
    z.von_sammlung_datum = get(z, 'von_sammlung.datum', '')
    z.von_sammlung_herkunft_id = get(z, 'von_sammlung.herkunft_id', '')
    z.von_sammlung_herkunft_nr = get(z, 'von_sammlung.herkunft.nr', '')
    z.von_sammlung_person_id = get(z, 'von_sammlung.person_id', '')
    z.von_sammlung_person_name = get(z, 'von_sammlung.person.name', '')
    delete z.von_sammlung
    z.von_kultur_garten_id = get(z, 'kulturByVonKulturId.garten_id', '')
    z.von_kultur_garten_name = get(z, 'kulturByVonKulturId.garten.name', '')
    z.von_kultur_herkunft_id = get(z, 'kulturByVonKulturId.herkunft_id', '')
    z.von_kultur_herkunft_nr = get(z, 'kulturByVonKulturId.herkunft.nr', '')
    delete z.kulturByVonKulturId
    z.nach_kultur_garten_id = get(z, 'kulturByNachKulturId.garten_id', '')
    z.nach_kultur_garten_name = get(z, 'kulturByNachKulturId.garten.name', '')
    z.nach_kultur_herkunft_id = get(z, 'kulturByNachKulturId.herkunft_id', '')
    z.nach_kultur_herkunft_nr = get(z, 'kulturByNachKulturId.herkunft.nr', '')
    delete z.kulturByNachKulturId
    delete z.__typename
    return z
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: wbPassed ? `Kultur_${kultur_id}_Auslieferungen` : 'Auslieferungen',
    data: auslieferungen,
  })
  // 6. Get Events
  let eventResult
  try {
    eventResult = await client.query({
      query: gql`
        query GetEventsForKulturDownload($id: bigint!) {
          event(where: { kultur_id: { _eq: $id } }) {
            id
            kultur_id
            teilkultur_id
            teilkultur {
              id
              name
            }
            person_id
            person {
              id
              name
            }
            beschreibung
            geplant
            datum
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
  const eventsArray = get(eventResult, 'data.event') || []
  const events = eventsArray.map(z => {
    z.teilkultur_name = get(z, 'teilkultur.name', '')
    delete z.teilkultur
    z.person_name = get(z, 'person.name', '')
    delete z.person
    delete z.__typename
    return z
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: wbPassed ? `Kultur_${kultur_id}_Events` : 'Events',
    data: events,
  })

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
