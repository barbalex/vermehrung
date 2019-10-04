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
  teilkultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  person_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  beschreibung: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  geplant: types.optional(types.boolean, false),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  beschreibung: null,
  geplant: false,
  datum: null,
}

export const empty = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  beschreibung: null,
  geplant: null,
  datum: null,
}

export const simpleTypes = {
  id: 'number',
  kultur_id: 'number',
  teilkultur_id: 'number',
  person_id: 'number',
  beschreibung: 'string',
  geplant: 'boolean',
  datum: 'string',
}
