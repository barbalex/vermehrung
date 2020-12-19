import gql from 'graphql-tag'

import { herkunftRev } from './fragments'

const mutations = {
  mutateInsert_herkunft_rev_one: gql`
    mutation mutateInsert_herkunft_rev_one(
      $object: herkunft_rev_insert_input!
      $on_conflict: herkunft_rev_on_conflict
    ) {
      insert_herkunft_rev_one(object: $object, on_conflict: $on_conflict) {
        ...HerkunftRevFields
      }
    }
    ${herkunftRev}
  `,
}

export default mutations
