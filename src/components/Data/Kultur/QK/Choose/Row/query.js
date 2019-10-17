import gql from 'graphql-tag'

import { kulturQkChoosen } from '../../../../../../utils/fragments'

export default gql`
  query kulturQkChoosenQueryForRow($kulturId: bigint!, $qkName: String!) {
    kultur_qk_choosen(
      where: { kultur_id: { _eq: $kulturId }, qk_name: { _eq: $qkName } }
    ) {
      ...KulturQkChoosenFields
    }
  }
  ${kulturQkChoosen}
`
