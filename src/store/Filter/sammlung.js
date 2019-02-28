import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  art_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  person_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  herkunft_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nr: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_anzahl_individuen: types.optional(types.maybeNull(types.number), null),
  zaehleinheit: types.optional(types.maybeNull(types.number), null),
  menge: types.optional(types.maybeNull(types.number), null),
  masseinheit: types.optional(types.maybeNull(types.number), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  art_id: null,
  person_id: null,
  herkunft_id: null,
  nr: null,
  datum: null,
  von_anzahl_individuen: null,
  zaehleinheit: null,
  menge: null,
  masseinheit: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  art_id: 'string',
  person_id: 'string',
  herkunft_id: 'string',
  nr: 'string',
  datum: 'string',
  von_anzahl_individuen: 'number',
  zaehleinheit: 'number',
  menge: 'number',
  masseinheit: 'number',
  bemerkungen: 'string',
}
