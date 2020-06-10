import gql from 'graphql-tag'

import { art, av } from '../../../../utils/fragments'

export default gql`
  query PersonenForArtenQuery($artId: uuid!) {
    av(where: { art_id: { _eq: $artId } }) {
      id
      __typename
      art_id
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
  ${art}
  ${av}
`
