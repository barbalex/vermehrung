import { Q } from '@nozbe/watermelondb'

import notDeletedOrHasConflictQuery from './notDeletedOrHasConflictQuery'

const childQuery = ({ table, parentId }) => (
  Q.experimentalJoinTables([table]),
  Q.and(notDeletedOrHasConflictQuery, Q.on(table, 'id', parentId))
)

export default childQuery
