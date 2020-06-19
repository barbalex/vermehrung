import gql from 'graphql-tag'

import { herkunftSums as herkunftSumsFragment } from '../../../../utils/fragments'

export default gql`
  query HerkunftSumsQueryForArt($id: uuid!) {
    herkunft_sums(where: { art_id: { _eq: $id } }) {
      ...HerkunftSumsFields
    }
  }
  ${herkunftSumsFragment}
`
