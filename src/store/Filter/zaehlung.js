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
  bedarf: types.optional(types.maybeNull(types.boolean), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  kultur_id: null,
  datum: null,
  bedarf: null,
  bemerkungen: null,
  _deleted: false,
}

export const empty = {
  id: null,
  kultur_id: null,
  datum: null,
  bedarf: null,
  bemerkungen: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  kultur_id: 'uuid',
  datum: 'date',
  bedarf: 'boolean',
  bemerkungen: 'string',
  _deleted: 'boolean',
}
