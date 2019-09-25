import gql from 'graphql-tag'

import { lieferung as lieferungFragment } from '../../../utils/fragments'

export default ({ field, valueToSet }) => gql`
mutation update_lieferung(
  $id: bigint!
) {
  update_lieferung(
    where: { id: { _eq: $id } }
    _set: {
      ${field}: ${valueToSet}
      von_kultur_id: null,
      von_sammlung_id: null,
      nach_kultur_id: null,
    }
  ) {
    affected_rows
    returning {
      ...LieferungFields
    }
  }
}
${lieferungFragment}
`
