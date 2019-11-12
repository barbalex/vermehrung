import gql from 'graphql-tag'

import { artSums as artSumsFragment } from '../../../../utils/fragments'

export default gql`
  query ArtSumsQuery($id: bigint!) {
    art_sums(where: { art_id: { _eq: $id } }) {
      ...ArtSumsFields
    }
  }
  ${artSumsFragment}
`
