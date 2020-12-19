import gql from 'graphql-tag'

import {
  artRev,
  gartenRev,
  herkunftRev,
  kulturRev,
  lieferungRev,
  sammlungRev,
  teilkulturRev,
} from './fragments'

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
  mutateInsert_garten_rev_one: gql`
    mutation insert_garten_rev_one(
      $object: garten_rev_insert_input!
      $on_conflict: garten_rev_on_conflict
    ) {
      insert_garten_rev_one(object: $object, on_conflict: $on_conflict) {
        ...GartenRevFields
      }
    }
    ${gartenRev}
  `,
  mutateInsert_kultur_rev_one: gql`
    mutation insert_kultur_rev_one(
      $object: kultur_rev_insert_input!
      $on_conflict: kultur_rev_on_conflict
    ) {
      insert_kultur_rev_one(object: $object, on_conflict: $on_conflict) {
        ...KulturRevFields
      }
    }
    ${kulturRev}
  `,
  mutateInsert_teilkultur_rev_one: gql`
    mutation insert_teilkultur_rev_one(
      $object: teilkultur_rev_insert_input!
      $on_conflict: teilkultur_rev_on_conflict
    ) {
      insert_teilkultur_rev_one(object: $object, on_conflict: $on_conflict) {
        ...TeilkulturRevFields
      }
    }
    ${teilkulturRev}
  `,
}

export default mutations
