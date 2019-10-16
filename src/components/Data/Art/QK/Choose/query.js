import gql from 'graphql-tag'

import { artQk } from '../../../../../utils/fragments'

export default gql`
  query ArtQkQueryForRow {
    art_qk(order_by: [{ sort: asc_nulls_last }, { name: asc_nulls_first }]) {
      ...ArtQkFields
    }
  }
  ${artQk}
`
