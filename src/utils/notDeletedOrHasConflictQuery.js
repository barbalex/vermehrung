import { Q } from '@nozbe/watermelondb'

const notDeletedOrHasConflictQuery = Q.or(
  Q.where('_deleted', false),
  Q.and(
    Q.where('_deleted', true),
    Q.and(
      Q.where('_conflicts', Q.notEq(null)),
      Q.where('_conflicts', Q.notEq('[]')),
    ),
  ),
)

export default notDeletedOrHasConflictQuery
