import gql from 'graphql-tag'

import {
  garten as gartenFragment,
  kultur as kulturFragment,
} from '../../../utils/fragments'

export default gql`
  query gartenQueryForKultur($include: Boolean!) {
    garten(order_by: { person: { name: asc_nulls_first } }) {
      ...GartenFields
      person {
        id
        __typename
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
