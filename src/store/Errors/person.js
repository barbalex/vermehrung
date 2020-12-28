import { types } from 'mobx-state-tree'

export const type = types.model({
  nr: types.union(types.string, types.undefined, types.null),
  vorname: types.union(types.string, types.undefined, types.null),
  name: types.union(types.string, types.undefined, types.null),
  adresszusatz: types.union(types.string, types.undefined, types.null),
  strasse: types.union(types.string, types.undefined, types.null),
  plz: types.union(types.string, types.undefined, types.null),
  ort: types.union(types.string, types.undefined, types.null),
  telefon_privat: types.union(types.string, types.undefined, types.null),
  telefon_geschaeft: types.union(types.string, types.undefined, types.null),
  telefon_mobile: types.union(types.string, types.undefined, types.null),
  email: types.union(types.string, types.undefined, types.null),
  kein_email: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
  changed: types.union(types.string, types.undefined, types.null),
  changed_by: types.union(types.string, types.undefined, types.null),
  account_id: types.union(types.string, types.undefined, types.null),
  user_role_id: types.union(types.string, types.undefined, types.null),
  kommerziell: types.union(types.string, types.undefined, types.null),
  info: types.union(types.string, types.undefined, types.null),
  aktiv: types.union(types.string, types.undefined, types.null),
})
