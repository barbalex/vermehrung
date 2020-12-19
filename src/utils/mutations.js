import gql from 'graphql-tag'

import { artRev, herkunftRev, lieferungRev, sammlungRev } from './fragments'

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
  mutateInsert_sammlung_rev_one: gql`
    mutation insert_sammlung_rev_one(
      $object: sammlung_rev_insert_input!
      $on_conflict: sammlung_rev_on_conflict
    ) {
      insert_sammlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ...SammlungRevFields
      }
    }
    ${sammlungRev}
  `,
  mutateInsert_lieferung_rev_one: gql`
    mutation insert_lieferung_rev_one(
      $object: lieferung_rev_insert_input!
      $on_conflict: lieferung_rev_on_conflict
    ) {
      insert_lieferung_rev_one(object: $object, on_conflict: $on_conflict) {
        ...LieferungRevFields
      }
    }
    ${lieferungRev}
  `,
  mutateInsert_art_rev_one: gql`
    mutation insert_art_rev_one(
      $object: art_rev_insert_input!
      $on_conflict: art_rev_on_conflict
    ) {
      insert_art_rev_one(object: $object, on_conflict: $on_conflict) {
        ...ArtRevFields
      }
    }
    ${artRev}
  `,
}

export default mutations
