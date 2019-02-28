import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kulturId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kasten: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  beet: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nr: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anzahlPflanzen: types.optional(types.maybeNull(types.number), null),
  anzahlMutterPflanzen: types.optional(types.maybeNull(types.number), null),
  anzNichtAuspflanzbereit: types.optional(types.maybeNull(types.number), null),
  anzAuspflanzbereit: types.optional(types.maybeNull(types.number), null),
  anzBluehend: types.optional(types.maybeNull(types.number), null),
  bluehdatum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  instruktion: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  kulturId: null,
  datum: null,
  kasten: null,
  beet: null,
  nr: null,
  anzahlPflanzen: null,
  anzahlMutterPflanzen: null,
  anzNichtAuspflanzbereit: null,
  anzAuspflanzbereit: null,
  anzBluehend: null,
  bluehdatum: null,
  instruktion: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  kulturId: 'string',
  datum: 'string',
  kasten: 'string',
  beet: 'string',
  nr: 'string',
  anzahlPflanzen: 'number',
  anzahlMutterPflanzen: 'number',
  anzNichtAuspflanzbereit: 'number',
  anzAuspflanzbereit: 'number',
  anzBluehend: 'number',
  bluehdatum: 'string',
  instruktion: 'string',
  bemerkungen: 'string',
}
