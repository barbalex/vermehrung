import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  artId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  gartenId: types.optional(
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
  artId: null,
  gartenId: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  artId: 'string',
  gartenId: 'string',
  bemerkungen: 'string',
}
