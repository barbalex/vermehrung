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
  geplant: types.optional(types.maybeNull(types.boolean), null),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  beschreibung: null,
  geplant: null,
  datum: null,
  _deleted: false,
}

export const empty = {
  id: null,
  kultur_id: null,
  teilkultur_id: null,
  person_id: null,
  beschreibung: null,
  geplant: null,
  datum: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  kultur_id: 'uuid',
  teilkultur_id: 'uuid',
  person_id: 'uuid',
  beschreibung: 'string',
  geplant: 'boolean',
  datum: 'date',
  _deleted: 'boolean',
}
