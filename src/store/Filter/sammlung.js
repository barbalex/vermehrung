import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  artId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  personId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  herkunftId: types.optional(
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
  vonAnzahlIndividuen: types.optional(types.maybeNull(types.number), null),
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
  artId: null,
  personId: null,
  herkunftId: null,
  nr: null,
  datum: null,
  vonAnzahlIndividuen: null,
  zaehleinheit: null,
  menge: null,
  masseinheit: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  artId: 'string',
  personId: 'string',
  herkunftId: 'string',
  nr: 'string',
  datum: 'string',
  vonAnzahlIndividuen: 'number',
  zaehleinheit: 'number',
  menge: 'number',
  masseinheit: 'number',
  bemerkungen: 'string',
}
