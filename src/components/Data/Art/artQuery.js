import gql from 'graphql-tag'

import { art as artFragment } from '../../../utils/fragments'

export default gql`
  query ArtQuery($id: bigint!, $filter: art_bool_exp!, $isFiltered: Boolean!) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
    }
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${artFragment}
`
