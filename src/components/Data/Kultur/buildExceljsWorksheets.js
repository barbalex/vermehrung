import gql from 'graphql-tag'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'
import removeMetadataFromDataset from '../../../utils/removeMetadataFromDataset'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({ store, kultur_id, workbook, calledFromHigherUp }) => {
  const { addNotification } = store

  // 1. Get Kultur
  if (!calledFromHigherUp) {
    let kulturResult
    try {
      kulturResult = await store.query(
        gql`
          query GetKulturForKulturDownload($id: uuid!) {
            kultur(where: { id: { _eq: $id } }) {
              id
              __typename
              art_id
              art {
                id
                __typename
                art_ae_art {
                  id
                  __typename
                  name
                }
              }
              herkunft_id
              herkunft {
                id
                __typename
                nr
              }
              garten_id
              garten {
                id
                __typename
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
        {
          id: kultur_id,
        },
      )
    } catch (error) {
      return addNotification({
        message: error.message,
      })
    }
    const kultur = kulturResult?.kultur[0]
    const newK = {
      kultur_id: kultur.id,
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
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_id}` : 'Kultur',
      data: [newK],
    })
  }
  // 2. Get Zählungen
  let zaehlungResult
  try {
    zaehlungResult = await store.query(
      gql`
        query GetZaehlungForKulturDownload($id: uuid!) {
          zaehlung(where: { kultur_id: { _eq: $id } }) {
            id
            __typename
            kultur_id
            datum
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
                __typename
                teilkultur {
                  id
                  __typename
                  name
                  ort1
                  ort2
                  ort3
                }
                andere_menge
              }
            }
          }
        }
      `,
      {
        id: kultur_id,
      },
    )
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const zaehlungenArray = zaehlungResult?.zaehlung ?? []
  const zaehlungen = zaehlungenArray.map((z) => {
    const newZ = {
      id: z.id,
      kultur_id: z.kultur_id,
      datum: z.datum,
      prognose: z.prognose,
      bemerkungen: z.bemerkungen,
    }
    newZ.teilzaehlungen_anzahl =
      z?.teilzaehlungs_aggregate?.aggregate?.count ?? ''
    newZ.teilzaehlungen_anzahl_pflanzen =
      z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? ''
    newZ.teilzaehlungen_anzahl_auspflanzbereit =
      z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ?? ''
    newZ.teilzaehlungen_anzahl_mutterpflanzen =
      z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ?? ''
    const tknodes = z?.teilzaehlungs_aggregate?.nodes ?? []
    newZ.teilzaehlungen_ids = tknodes
      .filter((tk) => !!tk?.id)
      .map((tk) => tk?.id)
      .join(', ')
    newZ.teilzaehlungen_teilkulturen = tknodes
      .filter((tk) => !!tk?.teilkultur?.name)
      .map((tk) => tk?.teilkultur?.name)
      .join(', ')
    newZ.teilzaehlungen_andere_mengen = tknodes
      .filter((tk) => !!tk?.andere_menge)
      .map((tk) => tk?.andere_menge)
      .join(', ')
    return newZ
  })
  if (zaehlungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_id}_Zaehlungen`
        : 'Zaehlungen',
      data: zaehlungen,
    })
  }
  // 3. Get Teil-Zählungen
  let teilzaehlungResult
  try {
    teilzaehlungResult = await store.query(
      gql`
        query GetTeilzaehlungForKulturDownload($id: uuid!) {
          teilzaehlung(where: { zaehlung: { kultur_id: { _eq: $id } } }) {
            id
            __typename
            zaehlung_id
            teilkultur_id
            teilkultur {
              id
              __typename
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
      {
        id: kultur_id,
      },
    )
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const teilzaehlungenArray = teilzaehlungResult?.teilzaehlung ?? []
  const teilzaehlungen = teilzaehlungenArray.map((z) => {
    const newZ = {
      id: z.id,
      zaehlung_id: z.zaehlung_id,
      teilkultur_id: z.teilkultur_id,
      teilkultur_name: z?.teilkultur?.name ?? '',
      anzahl_pflanzen: z.anzahl_pflanzen,
      anzahl_auspflanzbereit: z.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen: z.anzahl_mutterpflanzen,
      andere_menge: z.andere_menge,
      auspflanzbereit_beschreibung: z.auspflanzbereit_beschreibung,
      bemerkungen: z.bemerkungen,
    }
    return newZ
  })
  console.log('buildExcel', {
    teilzaehlungResult,
    teilzaehlungenArray,
    teilzaehlungen,
  })
  if (teilzaehlungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_id}_Teilzaehlungen`
        : 'Teilzaehlungen',
      data: teilzaehlungen,
    })
  }
  // 4. Get An-Lieferungen
  let anlieferungResult
  try {
    anlieferungResult = await store.query(
      gql`
        query GetAnlieferungForKulturDownload($id: uuid!) {
          lieferung(where: { nach_kultur_id: { _eq: $id } }) {
            id
            __typename
            sammel_lieferung_id
            art_id
            art {
              id
              __typename
              art_ae_art {
                id
                __typename
                name
              }
            }
            person_id
            person {
              id
              __typename
              name
            }
            von_sammlung_id
            von_sammlung: sammlung {
              id
              __typename
              datum
              herkunft_id
              herkunft {
                id
                __typename
                nr
              }
              person_id
              person {
                id
                __typename
                name
              }
            }
            von_kultur_id
            kulturByVonKulturId {
              id
              __typename
              garten_id
              garten {
                id
                __typename
                name
              }
              herkunft_id
              herkunft {
                id
                __typename
                nr
              }
            }
            datum
            nach_kultur_id
            kulturByNachKulturId {
              id
              __typename
              garten_id
              garten {
                id
                __typename
                name
              }
              herkunft_id
              herkunft {
                id
                __typename
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
      {
        id: kultur_id,
      },
    )
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const anlieferungenArray = anlieferungResult?.lieferung ?? []
  const anlieferungen = anlieferungenArray.map((z) => {
    z.art_ae_id = z?.art?.art_ae_art?.id ?? ''
    z.art_ae_name = z?.art?.art_ae_art?.name ?? ''
    delete z.art
    z.person_name = z?.person?.name ?? ''
    delete z.person
    z.von_sammlung_datum = z?.von_sammlung?.datum ?? ''
    z.von_sammlung_herkunft_id = z?.von_sammlung?.herkunft_id ?? ''
    z.von_sammlung_herkunft_nr = z?.von_sammlung?.herkunft?.nr ?? ''
    z.von_sammlung_person_id = z?.von_sammlung?.person_id ?? ''
    z.von_sammlung_person_name = z?.von_sammlung?.person?.name ?? ''
    delete z.von_sammlung
    z.von_kultur_garten_id = z?.kulturByVonKulturId?.garten_id ?? ''
    z.von_kultur_garten_name = z?.kulturByVonKulturId?.garten?.name ?? ''
    z.von_kultur_herkunft_id = z?.kulturByVonKulturId?.herkunft_id ?? ''
    z.von_kultur_herkunft_nr = z?.kulturByVonKulturId?.herkunft?.nr ?? ''
    delete z.kulturByVonKulturId
    z.nach_kultur_garten_id = z?.kulturByNachKulturId?.garten_id ?? ''
    z.nach_kultur_garten_name = z?.kulturByNachKulturId?.garten?.name ?? ''
    z.nach_kultur_herkunft_id = z?.kulturByNachKulturId?.herkunft_id ?? ''
    z.nach_kultur_herkunft_nr = z?.kulturByNachKulturId?.herkunft?.nr ?? ''
    delete z.kulturByNachKulturId
    delete z.__typename
    delete z._conflicts
    delete z._deleted
    delete z._depth
    delete z._rev
    delete z._parent_rev
    delete z._revisions
    return z
  })
  if (anlieferungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_id}_Anlieferungen`
        : 'Anlieferungen',
      data: anlieferungen,
    })
  }
  // 5. Get Aus-Lieferungen
  let auslieferungResult
  try {
    auslieferungResult = await store.query(
      gql`
        query GetAuslieferungForKulturDownload($id: uuid!) {
          lieferung(where: { von_kultur_id: { _eq: $id } }) {
            id
            __typename
            sammel_lieferung_id
            art_id
            art {
              id
              __typename
              art_ae_art {
                id
                __typename
                name
              }
            }
            person_id
            person {
              id
              __typename
              name
            }
            von_sammlung_id
            von_sammlung: sammlung {
              id
              __typename
              datum
              herkunft_id
              herkunft {
                id
                __typename
                nr
              }
              person_id
              person {
                id
                __typename
                name
              }
            }
            von_kultur_id
            kulturByVonKulturId {
              id
              __typename
              garten_id
              garten {
                id
                __typename
                name
              }
              herkunft_id
              herkunft {
                id
                __typename
                nr
              }
            }
            datum
            nach_kultur_id
            kulturByNachKulturId {
              id
              __typename
              garten_id
              garten {
                id
                __typename
                name
              }
              herkunft_id
              herkunft {
                id
                __typename
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
      {
        id: kultur_id,
      },
    )
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const auslieferungenArray = auslieferungResult?.lieferung ?? []
  const auslieferungen = auslieferungenArray.map((z) => {
    z.art_ae_id = z?.art?.art_ae_art?.id ?? ''
    z.art_ae_name = z?.art?.art_ae_art?.name ?? ''
    delete z.art
    z.person_name = z?.person?.name ?? ''
    delete z.person
    z.von_sammlung_datum = z?.von_sammlung?.datum ?? ''
    z.von_sammlung_herkunft_id = z?.von_sammlung?.herkunft_id ?? ''
    z.von_sammlung_herkunft_nr = z?.von_sammlung?.herkunft?.nr ?? ''
    z.von_sammlung_person_id = z?.von_sammlung?.person_id ?? ''
    z.von_sammlung_person_name = z?.von_sammlung?.person?.name ?? ''
    delete z.von_sammlung
    z.von_kultur_garten_id = z?.kulturByVonKulturId?.garten_id ?? ''
    z.von_kultur_garten_name = z?.kulturByVonKulturId?.garten?.name ?? ''
    z.von_kultur_herkunft_id = z?.kulturByVonKulturId?.herkunft_id ?? ''
    z.von_kultur_herkunft_nr = z?.kulturByVonKulturId?.herkunft?.nr ?? ''
    delete z.kulturByVonKulturId
    z.nach_kultur_garten_id = z?.kulturByNachKulturId?.garten_id ?? ''
    z.nach_kultur_garten_name = z?.kulturByNachKulturId?.garten?.name ?? ''
    z.nach_kultur_herkunft_id = z?.kulturByNachKulturId?.herkunft_id ?? ''
    z.nach_kultur_herkunft_nr = z?.kulturByNachKulturId?.herkunft?.nr ?? ''
    delete z.kulturByNachKulturId
    delete z.__typename
    delete z._conflicts
    delete z._deleted
    delete z._depth
    delete z._rev
    delete z._parent_rev
    delete z._revisions
    return z
  })
  if (auslieferungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_id}_Auslieferungen`
        : 'Auslieferungen',
      data: auslieferungen,
    })
  }
  // 6. Get Events
  let eventResult
  try {
    eventResult = await store.query(
      gql`
        query GetEventsForKulturDownload($id: uuid!) {
          event(where: { kultur_id: { _eq: $id } }) {
            id
            __typename
            kultur_id
            teilkultur_id
            teilkultur {
              id
              __typename
              name
            }
            person_id
            person {
              id
              __typename
              name
            }
            beschreibung
            geplant
            datum
          }
        }
      `,
      {
        id: kultur_id,
      },
    )
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const eventsArray = eventResult?.event ?? []
  const events = eventsArray.map((z) => {
    z.teilkultur_name = z?.teilkultur?.name ?? ''
    delete z.teilkultur
    z.person_name = z?.person?.name ?? ''
    delete z.person
    delete z.__typename
    delete z._conflicts
    delete z._deleted
    delete z._depth
    delete z._rev
    delete z._parent_rev
    delete z._revisions
    return z
  })
  if (events.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_id}_Events` : 'Events',
      data: events,
    })
  }
  return
}
