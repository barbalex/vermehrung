import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kultur_id: types.optional(
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
  kultur_id: null,
  datum: null,
  event: null,
}

export const empty = {
  id: null,
  kultur_id: null,
  datum: null,
  event: null,
}

export const simpleTypes = {
  id: 'number',
  kultur_id: 'number',
  datum: 'string',
  event: 'string',
}
