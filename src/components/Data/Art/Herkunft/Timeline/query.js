import gql from 'graphql-tag'

import { herkunft as herkunftFragment } from '../../../../../utils/fragments'

export default gql`
  query HerkunftQueryForArtTimeline($id: uuid!) {
    herkunft(where: { id: { _eq: $id } }) {
      ...HerkunftFields
    }
  }
  ${herkunftFragment}
`
