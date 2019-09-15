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
  name: types.optional(
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
  kultur_id: null,
  name: null,
  bemerkungen: null,
}

export const empty = {
  id: null,
  kultur_id: null,
  name: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  kultur_id: 'number',
  name: 'string',
  bemerkungen: 'string',
}
