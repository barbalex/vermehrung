import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  name: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  person_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  strasse: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  plz: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  ort: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  // geomPoint missing!
  aktiv: types.optional(types.boolean, true),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  name: null,
  person_id: null,
  strasse: null,
  plz: null,
  ort: null,
  aktiv: true,
  bemerkungen: null,
}

export const empty = {
  id: null,
  name: null,
  person_id: null,
  strasse: null,
  plz: null,
  ort: null,
  aktiv: true,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  name: 'string',
  person_id: 'number',
  strasse: 'string',
  plz: 'number',
  ort: 'string',
  aktiv: 'boolean',
  bemerkungen: 'string',
}
