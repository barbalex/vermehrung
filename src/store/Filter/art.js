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
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  ae_id: null,
  _deleted: false,
}

export const empty = {
  id: null,
  ae_id: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  ae_id: 'uuid',
  _deleted: 'boolean',
}
