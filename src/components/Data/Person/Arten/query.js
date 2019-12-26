import gql from 'graphql-tag'

import { art } from '../../../../utils/fragments'

export default gql`
  query ArtenForPersonQuery {
    art(order_by: { art_ae_art: { name: asc_nulls_first } }) {
      ...ArtFields
    }
  }
  ${art}
`
