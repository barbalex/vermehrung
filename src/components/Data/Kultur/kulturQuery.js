import gql from 'graphql-tag'

import {
  art as artFragment,
  garten as gartenFragment,
  kultur as kulturFragment,
  kulturFelder as kulturFelderFragment,
  lieferung as lieferungFragment,
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
      lieferungsByVonKulturId {
        ...LieferungFields
      }
      lieferungsByNachKulturId {
        ...LieferungFields
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
`
