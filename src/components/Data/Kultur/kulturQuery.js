import gql from 'graphql-tag'

import {
  art as artFragment,
  garten as gartenFragment,
  kultur as kulturFragment,
  kulturOption as kulturOptionFragment,
  lieferung as lieferungFragment,
  zaehlung as zahlungsFragment,
  teilzaehlung as teilzaehlungFragment,
} from '../../../utils/fragments'

export default gql`
  query KulturQueryForKultur(
    $id: uuid!
    $kulturFilter: kultur_bool_exp!
    $totalCountFilter: kultur_bool_exp!
    $artFilter: art_bool_exp!
    $herkunftFilter: herkunft_bool_exp!
  ) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      kultur_option {
        ...KulturOptionFields
      }
      garten {
        ...GartenFields
        person {
          id
          __typename
          name
        }
        kulturs(where: { art: { ae_id: { _is_null: false } } }) {
          id
          __typename
          art_id
          herkunft_id
        }
      }
      ausLieferungsDone: lieferungsByVonKulturId(
        where: { geplant: { _eq: false }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      ausLieferungsPlanned: lieferungsByVonKulturId(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      anLieferungsDone: lieferungsByNachKulturId(
        where: { geplant: { _eq: false }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      anLieferungsPlanned: lieferungsByNachKulturId(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      zaehlungsDone: zaehlungs(
        where: { prognose: { _eq: false }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...ZaehlungFields
        teilzaehlungs_aggregate {
          aggregate {
            sum {
              anzahl_pflanzen
              anzahl_auspflanzbereit
              anzahl_mutterpflanzen
            }
          }
        }
        teilzaehlungs {
          id
          __typename
          andere_menge
          auspflanzbereit_beschreibung
          bemerkungen
        }
      }
      zaehlungsPlanned: zaehlungs(
        where: { prognose: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...ZaehlungFields
        teilzaehlungs_aggregate {
          aggregate {
            sum {
              anzahl_pflanzen
              anzahl_auspflanzbereit
              anzahl_mutterpflanzen
            }
          }
        }
        teilzaehlungs {
          id
          __typename
          andere_menge
          auspflanzbereit_beschreibung
          bemerkungen
        }
      }
    }
    kultur_total_count: kultur_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    kultur_filtered_count: kultur_aggregate(where: $kulturFilter) {
      aggregate {
        count
      }
    }
    sammlung(
      where: { art_id: { _is_null: false }, herkunft_id: { _is_null: false } }
    ) {
      id
      __typename
      art_id
      herkunft_id
    }
    art(where: $artFilter) {
      ...ArtFields
    }
    herkunft(where: $herkunftFilter) {
      id
      __typename
      nr
      lokalname
      gemeinde
    }
    garten {
      id
      __typename
      name
      person {
        id
        __typename
        name
      }
    }
  }
  ${artFragment}
  ${gartenFragment}
  ${kulturFragment}
  ${kulturOptionFragment}
  ${lieferungFragment}
  ${teilzaehlungFragment}
  ${zahlungsFragment}
`
