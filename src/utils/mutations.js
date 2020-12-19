import gql from 'graphql-tag'

import {
  artRev,
  artQkRev,
  avRev,
  eventRev,
  gartenRev,
  gvRev,
  herkunftRev,
  kulturRev,
  kulturOptionRev,
  lieferungRev,
  personRev,
  sammelLieferungRev,
  sammlungRev,
  teilkulturRev,
  teilzaehlungRev,
  zaehlungRev,
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
  mutateInsert_zaehlung_rev_one: gql`
    mutation insert_zaehlung_rev_one(
      $object: zaehlung_rev_insert_input!
      $on_conflict: zaehlung_rev_on_conflict
    ) {
      insert_zaehlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ...ZaehlungRevFields
      }
    }
    ${zaehlungRev}
  `,
  mutateInsert_teilzaehlung_rev_one: gql`
    mutation insert_teilzaehlung_rev_one(
      $object: teilzaehlung_rev_insert_input!
      $on_conflict: teilzaehlung_rev_on_conflict
    ) {
      insert_teilzaehlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ...TeilzaehlungRevFields
      }
    }
    ${teilzaehlungRev}
  `,
  mutateInsert_person_rev_one: gql`
    mutation insert_person_rev_one(
      $object: person_rev_insert_input!
      $on_conflict: person_rev_on_conflict
    ) {
      insert_person_rev_one(object: $object, on_conflict: $on_conflict) {
        ...PersonRevFields
      }
    }
    ${personRev}
  `,
  mutateInsert_sammel_lieferung_rev_one: gql`
    mutation insert_sammel_lieferung_rev_one(
      $object: sammel_lieferung_rev_insert_input!
      $on_conflict: sammel_lieferung_rev_on_conflict
    ) {
      insert_sammel_lieferung_rev_one(
        object: $object
        on_conflict: $on_conflict
      ) {
        ...SammelLieferungRevFields
      }
    }
    ${sammelLieferungRev}
  `,
  mutateInsert_event_rev_one: gql`
    mutation insert_event_rev_one(
      $object: event_rev_insert_input!
      $on_conflict: event_rev_on_conflict
    ) {
      insert_event_rev_one(object: $object, on_conflict: $on_conflict) {
        ...EventRevFields
      }
    }
    ${eventRev}
  `,
  mutateInsert_av_rev_one: gql`
    mutation insert_av_rev_one(
      $object: av_rev_insert_input!
      $on_conflict: av_rev_on_conflict
    ) {
      insert_av_rev_one(object: $object, on_conflict: $on_conflict) {
        ...AvRevFields
      }
    }
    ${avRev}
  `,
  mutateInsert_gv_rev_one: gql`
    mutation insert_gv_rev_one(
      $object: gv_rev_insert_input!
      $on_conflict: gv_rev_on_conflict
    ) {
      insert_gv_rev_one(object: $object, on_conflict: $on_conflict) {
        ...GvRevFields
      }
    }
    ${gvRev}
  `,
  mutateInsert_art_qk_rev_one: gql`
    mutation insert_art_qk_rev_one(
      $object: art_qk_rev_insert_input!
      $on_conflict: art_qk_rev_on_conflict
    ) {
      insert_art_qk_rev_one(object: $object, on_conflict: $on_conflict) {
        ...ArtQkRevFields
      }
    }
    ${artQkRev}
  `,
  mutateInsert_kultur_option_rev_one: gql`
    mutation insert_kultur_option_rev_one(
      $object: kultur_option_rev_insert_input!
      $on_conflict: kultur_option_rev_on_conflict
    ) {
      insert_kultur_option_rev_one(object: $object, on_conflict: $on_conflict) {
        ...KulturOptionRevFields
      }
    }
    ${kulturOptionRev}
  `,
}

export default mutations
