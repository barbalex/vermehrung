// not in use
// TODO:
// causes error: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
import { withObservables } from '@nozbe/watermelondb/react'
import { withDatabase } from '@nozbe/watermelondb/react/DatabaseProvider'

import Herkunft from './Herkunft'

const enhance = withDatabase(
  withObservables(['id'], ({ id, filter, database }) => ({
    row: database.collections.get('herkunft').findAndObserve(id),
    id,
    filter,
  })),
)

export default enhance(Herkunft)
