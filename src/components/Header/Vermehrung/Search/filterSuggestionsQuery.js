import gql from 'graphql-tag'

import {
  art as artFragment,
  event as eventFragment,
  garten as gartenFragment,
  herkunft as herkunftFragment,
  kultur as kulturFragment,
  lieferung as lieferungFragment,
  person as personFragment,
  sammlung as sammlungFragment,
  zaehlung as zaehlungFragment,
} from '../../../../utils/fragments'

export default gql`
  query filterSuggestionsQuery(
    $filter: String!
    $run: Boolean!
    $personFilter: person_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
  ) {
    art: art_search(args: { filter: $filter }) @include(if: $run) {
      ...ArtFields
    }
    garten: garten_search(args: { filter: $filter }, where: $gartenFilter)
      @include(if: $run) {
      ...GartenFields
      person {
        ...PersonFields
      }
    }
    herkunft: herkunft_search(args: { filter: $filter }) @include(if: $run) {
      ...HerkunftFields
    }
    kultur: kultur_search(args: { filter: $filter }, where: $kulturFilter)
      @include(if: $run) {
      ...KulturFields
      art {
        ...ArtFields
      }
      garten {
        id
        __typename
        name
        person {
          ...PersonFields
        }
      }
    }
    event: event_search(args: { filter: $filter }) @include(if: $run) {
      ...EventFields
      kultur {
        ...KulturFields
      }
    }
    lieferung: lieferung_search(args: { filter: $filter }) @include(if: $run) {
      ...LieferungFields
    }
    person: person_search(args: { filter: $filter }, where: $personFilter)
      @include(if: $run) {
      ...PersonFields
    }
    sammlung: sammlung_search(args: { filter: $filter }) @include(if: $run) {
      ...SammlungFields
      art {
        ...ArtFields
      }
      person {
        ...PersonFields
      }
    }
    zaehlung: zaehlung_search(args: { filter: $filter }) @include(if: $run) {
      ...ZaehlungFields
    }
  }
  ${artFragment}
  ${eventFragment}
  ${gartenFragment}
  ${herkunftFragment}
  ${kulturFragment}
  ${lieferungFragment}
  ${personFragment}
  ${sammlungFragment}
  ${zaehlungFragment}
`
