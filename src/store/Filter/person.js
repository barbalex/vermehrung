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
  plz: types.optional(types.maybeNull(types.number), null),
  ort: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  telefonPrivat: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  telefonGeschaeft: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  telefonMobile: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  faxPrivat: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  faxGeschaeft: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  email: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  keinEmail: types.optional(types.maybeNull(types.boolean), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  userId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  nr: null,
  name: null,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefonPrivat: null,
  telefonGeschaeft: null,
  telefonMobile: null,
  faxPrivat: null,
  faxGeschaeft: null,
  email: null,
  keinEmail: null,
  bemerkungen: null,
  userId: null,
}

export const simpleTypes = {
  id: 'number',
  nr: 'string',
  name: 'string',
  adresszusatz: 'string',
  strasse: 'string',
  plz: 'number',
  ort: 'string',
  telefonPrivat: 'string',
  telefonGeschaeft: 'string',
  telefonMobile: 'string',
  faxPrivat: 'string',
  faxGeschaeft: 'string',
  email: 'string',
  keinEmail: 'boolean',
  bemerkungen: 'string',
  userId: 'string',
}
