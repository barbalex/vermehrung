import gql from 'graphql-tag'

import {
  art as artFragment,
  artSums as artSumsFragment,
  herkunftSums as herkunftSumsFragment,
} from '../../../utils/fragments'

export default gql`
  query ArtQuery($id: bigint!, $filter: art_bool_exp!, $isFiltered: Boolean!) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
      artSums: art_sums(where: { art_id: { _eq: $id } }) {
        ...ArtSumsFields
      }
      herkunftSums: herkunft_sums(where: { art_id: { _eq: $id } }) {
        ...HerkunftSumsFields
      }
    }
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${artFragment}
  ${artSumsFragment}
  ${herkunftSumsFragment}
`
