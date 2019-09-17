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
  fax_privat: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  fax_geschaeft: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  email: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kein_email: types.optional(types.boolean, false),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  accountId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kommerziell: types.optional(types.boolean, false),
  info: types.optional(types.boolean, false),
  aktiv: types.optional(types.boolean, true),
})

export const initial = {
  id: null,
  nr: null,
  name: null,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefon_privat: null,
  telefon_geschaeft: null,
  telefon_mobile: null,
  fax_privat: null,
  fax_geschaeft: null,
  email: null,
  kein_email: false,
  bemerkungen: null,
  accountId: null,
  kommerziell: false,
  info: false,
  aktiv: true,
}

export const empty = {
  id: null,
  nr: null,
  name: null,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefon_privat: null,
  telefon_geschaeft: null,
  telefon_mobile: null,
  fax_privat: null,
  fax_geschaeft: null,
  email: null,
  kein_email: false,
  bemerkungen: null,
  accountId: null,
  kommerziell: false,
  info: false,
  aktiv: null,
}

export const simpleTypes = {
  id: 'number',
  nr: 'string',
  name: 'string',
  adresszusatz: 'string',
  strasse: 'string',
  plz: 'number',
  ort: 'string',
  telefon_privat: 'string',
  telefon_geschaeft: 'string',
  telefon_mobile: 'string',
  fax_privat: 'string',
  fax_geschaeft: 'string',
  email: 'string',
  kein_email: 'boolean',
  bemerkungen: 'string',
  accountId: 'string',
  kommerziell: 'boolean',
  info: 'boolean',
  aktiv: 'boolean',
}
