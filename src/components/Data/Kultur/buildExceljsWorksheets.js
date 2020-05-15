import gql from 'graphql-tag'
import get from 'lodash/get'

import addWorksheetToExceljsWorkbook from '../../../utils/addWorksheetToExceljsWorkbook'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({ store, kultur_id, workbook, calledFromHigherUp }) => {
  const { enqueNotification } = store

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
      return enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    const kultur = { ...get(kulturResult, 'kultur[0]') }
    kultur.art_ae_id = get(kultur, 'art.art_ae_art.id', '')
    kultur.art_ae_name = get(kultur, 'art.art_ae_art.name', '')
    delete kultur.art
    kultur.herkunft_id = get(kultur, 'herkunft.id', '')
    kultur.herkunft_nr = get(kultur, 'herkunft.nr', '')
    delete kultur.herkunft
    kultur.garten_id = get(kultur, 'garten.id', '')
    kultur.garten_name = get(kultur, 'garten.name', '')
    delete kultur.garten
    delete kultur.__typename
    delete kultur._conflicts
    delete kultur._depth
    delete kultur._parent_rev
    delete kultur._rev
    delete kultur._revisions
    delete kultur.events
    delete kultur.events_aggregate
    delete kultur.kultur_files
    delete kultur.kultur_files_aggregate
    delete kultur.kultur_option
    delete kultur.kultur_qk_choosens
    delete kultur.kultur_qk_choosens_aggregate
    delete kultur.lieferungsByNachKulturId
    delete kultur.lieferungsByNachKulturId_aggregate
    delete kultur.lieferungsByVonKulturId
    delete kultur.lieferungsByVonKulturId_aggregate
    delete kultur.sammelLieferungsByNachKulturId
    delete kultur.sammelLieferungsByNachKulturId_aggregate
    delete kultur.sammel_lieferungs
    delete kultur.sammel_lieferungs_aggregate
    delete kultur.teilkulturs
    delete kultur.teilkulturs_aggregate
    delete kultur.tsv
    delete kultur.zaehlungs
    delete kultur.zaehlungs_aggregate
    delete kultur.ausLieferungsDone
    delete kultur.ausLieferungsPlanned
    delete kultur.anLieferungsDone
    delete kultur.anLieferungsPlanned
    delete kultur.zaehlungsDone
    delete kultur.zaehlungsPlanned
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_id}` : 'Kultur',
      data: [kultur],
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
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const zaehlungenArray = get(zaehlungResult, 'zaehlung') || []
  const zaehlungen = zaehlungenArray.map((z) => {
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
      .filter((tk) => !!get(tk, 'id'))
      .map((tk) => get(tk, 'id'))
      .join(', ')
    z.teilzaehlungen_teilkulturen = tknodes
      .filter((tk) => !!get(tk, 'teilkultur.name'))
      .map((tk) => get(tk, 'teilkultur.name'))
      .join(', ')
    z.teilzaehlungen_andere_mengen = tknodes
      .filter((tk) => !!get(tk, 'andere_menge'))
      .map((tk) => get(tk, 'andere_menge'))
      .join(', ')
    delete z.teilzaehlungs_aggregate
    delete z.__typename
    return z
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
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const teilzaehlungenArray = get(teilzaehlungResult, 'teilzaehlung') || []
  const teilzaehlungen = teilzaehlungenArray.map((z) => {
    z.teilkultur_name = get(z, 'teilkultur.name', '')
    delete z.teilkultur
    delete z.__typename
    return z
  })
  if (teilzaehlungResult.length) {
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
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const anlieferungenArray = get(anlieferungResult, 'lieferung') || []
  const anlieferungen = anlieferungenArray.map((z) => {
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
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const auslieferungenArray = get(auslieferungResult, 'lieferung') || []
  const auslieferungen = auslieferungenArray.map((z) => {
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
    return enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const eventsArray = get(eventResult, 'event') || []
  const events = eventsArray.map((z) => {
    z.teilkultur_name = get(z, 'teilkultur.name', '')
    delete z.teilkultur
    z.person_name = get(z, 'person.name', '')
    delete z.person
    delete z.__typename
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
