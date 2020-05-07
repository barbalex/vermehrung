import gql from 'graphql-tag'

import { artQkChoosen } from '../../../../../../utils/fragments'

export default gql`
  query artQkChoosenQueryForRow($artId: uuid!, $qkName: String!) {
    art_qk_choosen(
      where: { art_id: { _eq: $artId }, qk_name: { _eq: $qkName } }
    ) {
      ...ArtQkChoosenFields
    }
  }
  ${artQkChoosen}
`
