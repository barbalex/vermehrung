import gql from 'graphql-tag'

import { artQk, artQkChoosen } from '../../../../utils/fragments'

export default gql`
  query ArtQkTopQuery($artId: uuid!) {
    art_qk {
      ...ArtQkFields
    }
    art_qk_choosen(where: { art_id: { _eq: $artId } }) {
      ...ArtQkChoosenFields
    }
  }
  ${artQk}
  ${artQkChoosen}
`
