import gql from 'graphql-tag'

import { aeArt as aeArtFragment } from '../../../utils/fragments'

export default gql`
  query aeArtQuery($filter: ae_art_bool_exp!) {
    ae_art(where: $filter, order_by: { name: asc_nulls_first }, limit: 7) {
      ...AeArtFields
    }
  }
  ${aeArtFragment}
`
