import { types } from 'mobx-state-tree'
import { type as kultur_felder } from './kultur_felder'

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
  zwischenlager: types.optional(types.boolean, false),
  erhaltungskultur: types.optional(types.boolean, false),
  von_anzahl_individuen: types.optional(types.maybeNull(types.number), null),
  aktiv: types.optional(types.boolean, true),
  teilkulturen: types.optional(types.boolean, false),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kultur_felders: types.maybe(kultur_felder),
})

export const initial = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: false,
  erhaltungskultur: false,
  von_anzahl_individuen: null,
  aktiv: true,
  teilkulturen: false,
  bemerkungen: null,
}

export const empty = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: false,
  erhaltungskultur: false,
  von_anzahl_individuen: null,
  aktiv: true,
  teilkulturen: false,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  art_id: 'number',
  herkunft_id: 'number',
  garten_id: 'number',
  zwischenlager: 'boolean',
  erhaltungskultur: 'boolean',
  von_anzahl_individuen: 'number',
  aktiv: 'boolean',
  teilkulturen: 'boolean',
  bemerkungen: 'string',
}
