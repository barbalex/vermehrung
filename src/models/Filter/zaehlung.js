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
  prognose: types.optional(types.maybeNull(types.boolean), false),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  kultur_id: null,
  datum: null,
  prognose: false,
  bemerkungen: null,
}

export const empty = {
  id: null,
  kultur_id: null,
  datum: null,
  prognose: false,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'uuid',
  kultur_id: 'uuid',
  datum: 'date',
  prognose: 'boolean',
  bemerkungen: 'string',
}
