import gql from 'graphql-tag'

import { herkunftSums as herkunftSumsFragment } from '../../../../utils/fragments'

export default gql`
  query HerkunftQueryForArt($id: uuid!) {
    herkunft_sums(where: { art_id: { _eq: $id } }) {
      ...HerkunftSumsFields
    }
  }
  ${herkunftSumsFragment}
`
