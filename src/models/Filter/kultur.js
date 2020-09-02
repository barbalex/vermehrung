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
  herkunft_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  garten_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  zwischenlager: types.optional(types.maybeNull(types.boolean), null),
  erhaltungskultur: types.optional(types.maybeNull(types.boolean), null),
  von_anzahl_individuen: types.optional(types.maybeNull(types.number), null),
  aktiv: types.optional(types.maybeNull(types.boolean), true),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  _deleted: types.optional(types.maybeNull(types.boolean), false),
})

export const initial = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: null,
  erhaltungskultur: null,
  von_anzahl_individuen: null,
  aktiv: true,
  bemerkungen: null,
  _deleted: false,
}

export const empty = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: null,
  erhaltungskultur: null,
  von_anzahl_individuen: null,
  aktiv: true,
  bemerkungen: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  art_id: 'uuid',
  herkunft_id: 'uuid',
  garten_id: 'uuid',
  zwischenlager: 'boolean',
  erhaltungskultur: 'boolean',
  von_anzahl_individuen: 'number',
  aktiv: 'boolean',
  bemerkungen: 'string',
  _deleted: 'boolean',
}
