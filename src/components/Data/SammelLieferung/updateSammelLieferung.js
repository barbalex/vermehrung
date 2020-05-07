import gql from 'graphql-tag'

import { sammelLieferung as sammelLieferungFragment } from '../../../utils/fragments'

export default ({ field, valueToSet }) => gql`
mutation update_sammel_lieferung(
  $id: uuid!
) {
  update_sammel_lieferung(
    where: { id: { _eq: $id } }
    _set: {
      ${field}: ${valueToSet}
    }
  ) {
    affected_rows
    returning {
      ...SammelLieferungFields
    }
  }
}
${sammelLieferungFragment}
`
