import gql from 'graphql-tag'

import { kulturQkChoosen } from '../../../../../../utils/fragments'

export default gql`
  query KulturQkChoosenQueryForRow($kulturId: uuid!, $qkName: String!) {
    kultur_qk_choosen(
      where: { kultur_id: { _eq: $kulturId }, qk_name: { _eq: $qkName } }
    ) {
      ...KulturQkChoosenFields
    }
  }
  ${kulturQkChoosen}
`
