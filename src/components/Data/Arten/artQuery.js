import gql from 'graphql-tag'

import { art as artFragment } from '../../../utils/fragments'

export default gql`
  query ArtQuery($filter: art_bool_exp!) {
    rowsUnfiltered: art {
      id
    }
    rowsFiltered: art(where: $filter, order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`
