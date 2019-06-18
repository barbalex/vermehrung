import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  person_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  aktiv: types.optional(types.maybeNull(types.boolean), true),
})

export const initial = {
  id: null,
  person_id: null,
  bemerkungen: null,
  aktiv: true,
}

export const simpleTypes = {
  id: 'number',
  person_id: 'number',
  bemerkungen: 'string',
  aktiv: 'boolean',
}
