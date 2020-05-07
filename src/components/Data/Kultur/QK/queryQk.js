import gql from 'graphql-tag'

import { kulturQk, kulturQkChoosen } from '../../../../utils/fragments'

export default gql`
  query KulturQkTopQuery($kulturId: uuid!) {
    kultur_qk(order_by: [{ sort: asc_nulls_last }, { name: asc_nulls_first }]) {
      ...KulturQkFields
    }
    kultur_qk_choosen(where: { kultur_id: { _eq: $kulturId } }) {
      ...KulturQkChoosenFields
    }
  }
  ${kulturQk}
  ${kulturQkChoosen}
`
