import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kulturId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  event: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  kulturId: null,
  datum: null,
  event: null,
}

export const simpleTypes = {
  id: 'number',
  kulturId: 'uuid',
  datum: 'string',
  event: 'string',
}
