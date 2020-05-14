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
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${artFragment}
  ${artSumsFragment}
`
