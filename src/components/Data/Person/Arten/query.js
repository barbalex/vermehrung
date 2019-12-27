import gql from 'graphql-tag'

import { art } from '../../../../utils/fragments'

export default gql`
  query ArtenForPersonQuery($personId: bigint!) {
    av_art(where: {person_id: {_eq: $personId}}){
      art_id
      person_id
      art {
        id
        art_ae_art {
          id
          name
        }
      }
    }
    art_to_choose: art(where: {_not: {av_art: {}}}, order_by: { art_ae_art: { name: asc_nulls_first } }) {
      ...ArtFields
    }
    art_choosen: art(where: {av_art: {}}, order_by: { art_ae_art: { name: asc_nulls_first } }) {
      ...ArtFields
    }
  }
  ${art}
`
