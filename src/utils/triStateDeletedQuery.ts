import { Q } from 'nitromelondb'

// the tri-state query shared by every list, form, tree branch and qk
// message: false = only rows where the column is false, true = only
// true, unset (or null) = all rows. Accepts unknown: filter atoms are
// untyped
export const triStateQuery = (column: string, value: unknown) =>
  value === false ? Q.where(column, false)
  : value === true ? Q.where(column, true)
  : Q.or(Q.where(column, false), Q.where(column, true), Q.where(column, null))

export const triStateDeletedQuery = (_deleted: unknown) =>
  triStateQuery('_deleted', _deleted)
