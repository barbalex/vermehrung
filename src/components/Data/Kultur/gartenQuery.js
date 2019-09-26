import gql from 'graphql-tag'

import {
  garten as gartenFragment,
  kultur as kulturFragment,
} from '../../../utils/fragments'

export default gql`
  query gartenQuery($include: Boolean!) {
    garten(order_by: { person: { name: asc_nulls_first } }) {
      id
      person {
        id
        name
      }
      kulturs @include(if: $include) {
        ...KulturFields
      }
    }
  }
  ${kulturFragment}
  ${gartenFragment}
`
