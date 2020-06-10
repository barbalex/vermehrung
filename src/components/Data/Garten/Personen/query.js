import gql from 'graphql-tag'

import { garten, gv } from '../../../../utils/fragments'

export default gql`
  query PersonenForGaertenQuery($gartenId: uuid!) {
    gv(where: { garten_id: { _eq: $gartenId } }) {
      id
      __typename
      garten_id
      person_id
      person {
        id
        __typename
        name
      }
    }
    person {
      id
      __typename
      name
    }
  }
  ${garten}
  ${gv}
`
