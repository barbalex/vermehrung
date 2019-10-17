import gql from 'graphql-tag'

import { kulturQk } from '../../../../../utils/fragments'

export default gql`
  query KulturQkQueryForRow {
    kultur_qk(order_by: [{ sort: asc_nulls_last }, { name: asc_nulls_first }]) {
      ...KulturQkFields
    }
  }
  ${kulturQk}
`
