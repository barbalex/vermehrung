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
  x: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  y: types.optional(
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
  person_id: null,
  x: null,
  y: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  person_id: 'number',
  x: 'number',
  y: 'number',
  bemerkungen: 'string',
}
