import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  personId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  x: types.optional(types.maybeNull(types.number), null),
  y: types.optional(types.maybeNull(types.number), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  personId: null,
  x: null,
  y: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  personId: 'uuid',
  x: 'number',
  y: 'number',
  bemerkungen: 'string',
}
