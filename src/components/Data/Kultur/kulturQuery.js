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
    $isFiltered: Boolean!
    $filter: kultur_bool_exp!
  ) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
      kultur_option {
        ...KulturOptionFields
      }
      garten {
        ...GartenFields
        kulturs(where: { art: { ae_id: { _is_null: false } } }) {
          id
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
          andere_menge
          auspflanzbereit_beschreibung
          bemerkungen
        }
      }
    }
    rowsUnfiltered: kultur @include(if: $isFiltered) {
      id
    }
    rowsFiltered: kultur(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${kulturFragment}
  ${artFragment}
  ${gartenFragment}
  ${kulturOptionFragment}
  ${lieferungFragment}
  ${zahlungsFragment}
  ${teilzaehlungFragment}
`
