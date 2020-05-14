import gql from 'graphql-tag'

import {
  art as artFragment,
  artSums as artSumsFragment,
} from '../../../utils/fragments'

export default gql`
  query ArtQueryForArt(
    $id: uuid!
    $filter: art_bool_exp!
    $isFiltered: Boolean!
  ) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
      artSums: art_sums(where: { art_id: { _eq: $id } }) {
        ...ArtSumsFields
      }
    }
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
      __typename
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${artFragment}
  ${artSumsFragment}
`
