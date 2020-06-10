import gql from 'graphql-tag'

import { garten, gv } from '../../../../utils/fragments'

export default gql`
  query ArtenForPersonQuery($personId: uuid!) {
    gv(where: { person_id: { _eq: $personId } }) {
      id
      __typename
      garten_id
      person_id
      garten {
        id
        __typename
        person {
          id
          __typename
          name
        }
      }
    }
    garten {
      ...GartenFields
      gvs {
        ...GvFields
      }
    }
  }
  ${garten}
  ${gv}
`
