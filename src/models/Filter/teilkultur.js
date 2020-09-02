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
  ort1: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  ort2: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  ort3: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  kultur_id: null,
  name: null,
  ort1: null,
  ort2: null,
  ort3: null,
  bemerkungen: null,
  _deleted: false,
}

export const empty = {
  id: null,
  kultur_id: null,
  name: null,
  ort1: null,
  ort2: null,
  ort3: null,
  bemerkungen: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  kultur_id: 'uuid',
  name: 'string',
  ort1: 'string',
  ort2: 'string',
  ort3: 'string',
  bemerkungen: 'string',
  _deleted: 'boolean',
}
