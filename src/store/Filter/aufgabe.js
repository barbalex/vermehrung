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
  aufgabe: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  erledigt: types.optional(types.boolean, false),
  frist: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  aufgabe: null,
  erledigt: false,
  frist: null,
}

export const empty = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  aufgabe: null,
  erledigt: null,
  frist: null,
}

export const simpleTypes = {
  id: 'number',
  kultur_id: 'number',
  teilkultur_id: 'number',
  person_id: 'number',
  aufgabe: 'string',
  erledigt: 'boolean',
  frist: 'string',
}
