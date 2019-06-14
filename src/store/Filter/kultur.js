import { types } from 'mobx-state-tree'
import { type as kultur_zaehlung_felder } from './kultur_zaehlung_felder'

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
  aktiv: types.optional(types.maybeNull(types.boolean), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kultur_zaehlung_felders: types.maybe(kultur_zaehlung_felder),
})

export const initial = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: null,
  erhaltungskultur: null,
  von_anzahl_individuen: null,
  aktiv: null,
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
  bemerkungen: 'string',
}
