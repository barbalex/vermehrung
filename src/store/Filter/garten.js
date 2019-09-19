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
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  aktiv: types.optional(types.boolean, true),
})

export const initial = {
  id: null,
  name: null,
  person_id: null,
  strasse: null,
  plz: null,
  ort: null,
  bemerkungen: null,
  aktiv: true,
}

export const empty = {
  id: null,
  name: null,
  person_id: null,
  strasse: null,
  plz: null,
  ort: null,
  bemerkungen: null,
  aktiv: true,
}

export const simpleTypes = {
  id: 'number',
  name: 'string',
  person_id: 'number',
  strasse: 'string',
  plz: 'number',
  ort: 'string',
  bemerkungen: 'string',
  aktiv: 'boolean',
}
