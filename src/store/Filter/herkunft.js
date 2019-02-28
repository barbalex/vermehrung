import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nr: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  lokalname: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  gemeinde: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kanton: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  land: types.optional(
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
  nr: null,
  lokalname: null,
  gemeinde: null,
  kanton: null,
  land: null,
  x: null,
  y: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  nr: 'string',
  lokalname: 'string',
  gemeinde: 'string',
  kanton: 'string',
  land: 'string',
  x: 'number',
  y: 'number',
  bemerkungen: 'string',
}
