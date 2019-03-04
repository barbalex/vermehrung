import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  art_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  person_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  typ: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  zaehleinheit: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  menge: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  masseinheit: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_sammlung_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  zwischenlager: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_ausgepflanzt: types.optional(types.maybeNull(types.boolean), null),
  status: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  art_id: null,
  person_id: null,
  typ: null,
  zaehleinheit: null,
  menge: null,
  masseinheit: null,
  von_datum: null,
  von_sammlung_id: null,
  von_kultur_id: null,
  zwischenlager: null,
  nach_datum: null,
  nach_kultur_id: null,
  nach_ausgepflanzt: null,
  status: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  art_id: 'number',
  person_id: 'number',
  typ: 'number',
  zaehleinheit: 'number',
  menge: 'number',
  masseinheit: 'number',
  von_datum: 'string',
  von_sammlung_id: 'number',
  von_kultur_id: 'number',
  zwischenlager: 'number',
  nach_datum: 'string',
  nach_kultur_id: 'number',
  nach_ausgepflanzt: 'boolean',
  status: 'number',
  bemerkungen: 'string',
}
