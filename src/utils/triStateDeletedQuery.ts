import { Q } from 'nitromelondb'

// the tri-state _deleted query shared by every list, form, tree branch
// and qk message: false = only active rows, true = only deleted, unset
// (or null) = all rows. Accepts unknown: filter atoms are untyped
export const triStateDeletedQuery = (_deleted: unknown) =>
  _deleted === false ? Q.where('_deleted', false)
  : _deleted === true ? Q.where('_deleted', true)
  : Q.or(
      Q.where('_deleted', false),
      Q.where('_deleted', true),
      Q.where('_deleted', null),
    )
