import gql from 'graphql-tag'

import { art as artFragment } from '../../../utils/fragments'

export default gql`
  query artQuery($filter: art_bool_exp!) {
    art(where: $filter, order_by: { art_ae_art: { name: asc_nulls_first } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`
