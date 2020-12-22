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
  vorname: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  name: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  adresszusatz: types.optional(
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
  telefon_privat: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  telefon_geschaeft: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  telefon_mobile: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  email: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kein_email: types.optional(types.maybeNull(types.boolean), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  account_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  user_role_id: types.optional(types.maybeNull(types.string), null),
  kommerziell: types.optional(types.maybeNull(types.boolean), null),
  info: types.optional(types.maybeNull(types.boolean), null),
  aktiv: types.optional(types.maybeNull(types.boolean), true),
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  nr: null,
  vorname: null,
  name: null,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefon_privat: null,
  telefon_geschaeft: null,
  telefon_mobile: null,
  email: null,
  kein_email: null,
  bemerkungen: null,
  account_id: null,
  user_role_id: null,
  kommerziell: null,
  info: null,
  aktiv: true,
  _deleted: false,
}

export const empty = {
  id: null,
  nr: null,
  vorname: null,
  name: null,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefon_privat: null,
  telefon_geschaeft: null,
  telefon_mobile: null,
  email: null,
  kein_email: null,
  bemerkungen: null,
  account_id: null,
  user_role_id: null,
  kommerziell: null,
  info: null,
  aktiv: true,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  nr: 'string',
  vorname: 'string',
  name: 'string',
  adresszusatz: 'string',
  strasse: 'string',
  plz: 'number',
  ort: 'string',
  telefon_privat: 'string',
  telefon_geschaeft: 'string',
  telefon_mobile: 'string',
  email: 'string',
  kein_email: 'boolean',
  bemerkungen: 'string',
  account_id: 'string',
  user_role_id: 'uuid',
  kommerziell: 'boolean',
  info: 'boolean',
  aktiv: 'boolean',
  _deleted: 'boolean',
}
