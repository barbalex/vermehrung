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
  // geomPoint missing
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
  bemerkungen: null,
}

export const empty = {
  id: null,
  nr: null,
  lokalname: null,
  gemeinde: null,
  kanton: null,
  land: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  nr: 'string',
  lokalname: 'string',
  gemeinde: 'string',
  kanton: 'string',
  land: 'string',
  bemerkungen: 'string',
}
