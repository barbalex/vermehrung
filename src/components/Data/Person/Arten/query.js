import gql from 'graphql-tag'

import { art, av } from '../../../../utils/fragments'

export default gql`
  query ArtenForPersonQuery($personId: uuid!) {
    av(where: { person_id: { _eq: $personId } }) {
      id
      __typename
      art_id
      person_id
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
    }
    art {
      ...ArtFields
      avs {
        ...AvFields
      }
    }
  }
  ${art}
  ${av}
`
