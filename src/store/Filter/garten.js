import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  name: types.optional(
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
  name: null,
  person_id: null,
  bemerkungen: null,
  aktiv: true,
}

export const empty = {
  id: null,
  name: null,
  person_id: null,
  bemerkungen: null,
  aktiv: null,
}

export const simpleTypes = {
  id: 'number',
  name: 'string',
  person_id: 'number',
  bemerkungen: 'string',
  aktiv: 'boolean',
}
