import gql from 'graphql-tag'

import { art } from '../../../../utils/fragments'

export default gql`
  query ArtenForPersonQuery($personId: uuid!) {
    av_art(
      where: { person_id: { _eq: $personId } }
      order_by: { art: { art_ae_art: { name: asc } } }
    ) {
      id
      __typename
      art_id
      person_id
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
    }
    art_to_choose: art(
      where: { _not: { av_art: {} } }
      order_by: { art_ae_art: { name: asc_nulls_first } }
    ) {
      ...ArtFields
    }
    art_choosen: art(
      where: { av_art: {} }
      order_by: { art_ae_art: { name: asc_nulls_first } }
    ) {
      ...ArtFields
    }
  }
  ${art}
`
