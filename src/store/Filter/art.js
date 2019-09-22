import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  ae_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  ae_id: null,
}

export const empty = {
  id: null,
  ae_id: null,
}

export const simpleTypes = {
  id: 'number',
  ae_id: 'string',
}
