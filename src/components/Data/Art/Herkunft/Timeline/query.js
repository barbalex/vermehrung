import gql from 'graphql-tag'

import { herkunft as herkunftFragment } from '../../../../../utils/fragments'

export default gql`
  query ArtTimelineHerkunftQuery($id: bigint!) {
    herkunft(where: { id: { _eq: $id } }) {
      ...HerkunftFields
    }
  }
  ${herkunftFragment}
`
