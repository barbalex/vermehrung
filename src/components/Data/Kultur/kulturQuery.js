import gql from 'graphql-tag'

import {
  art as artFragment,
  garten as gartenFragment,
  kultur as kulturFragment,
  kulturFelder as kulturFelderFragment,
  lieferung as lieferungFragment,
  zaehlung as zahlungsFragment,
  teilzaehlung as teilzaehlungFragment,
} from '../../../utils/fragments'

export default gql`
  query KulturQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: kultur_bool_exp!
  ) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
      kultur_felder {
        ...KulturFelderFields
      }
      garten {
        ...GartenFields
        kulturs(where: { art: { ae_id: { _is_null: false } } }) {
          id
          art_id
        }
      }
      ausLieferungs: lieferungsByVonKulturId(
        where: { datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      ausLieferungsGeplant: lieferungsByVonKulturId(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      anLieferungs: lieferungsByNachKulturId(
        where: { geplant: { _eq: false }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      anLieferungsGeplant: lieferungsByNachKulturId(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...LieferungFields
      }
      zaehlungs: zaehlungs(
        where: { geplant: { _eq: false }, datum: { _is_null: false } }
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
      }
      zaehlungsGeplant: zaehlungs(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
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
  ${kulturFelderFragment}
  ${lieferungFragment}
  ${zahlungsFragment}
  ${teilzaehlungFragment}
`
