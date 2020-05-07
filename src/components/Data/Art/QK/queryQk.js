import gql from 'graphql-tag'

import { artQk, artQkChoosen } from '../../../../utils/fragments'

export default gql`
  query ArtQkTopQuery($artId: uuid!) {
    art_qk(order_by: [{ sort: asc_nulls_last }, { name: asc_nulls_first }]) {
      ...ArtQkFields
    }
    art_qk_choosen(where: { art_id: { _eq: $artId } }) {
      ...ArtQkChoosenFields
    }
  }
  ${artQk}
  ${artQkChoosen}
`
