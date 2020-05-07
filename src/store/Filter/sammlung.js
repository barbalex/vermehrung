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
  anzahl_pflanzen: types.optional(types.maybeNull(types.number), null),
  gramm_samen: types.optional(types.maybeNull(types.number), null),
  andere_menge: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  // geomPoint missing
  geplant: types.optional(types.boolean, false),
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
  anzahl_pflanzen: null,
  gramm_samen: null,
  andere_menge: null,
  geplant: false,
  bemerkungen: null,
}

export const empty = {
  id: null,
  art_id: null,
  person_id: null,
  herkunft_id: null,
  nr: null,
  datum: null,
  von_anzahl_individuen: null,
  anzahl_pflanzen: null,
  gramm_samen: null,
  andere_menge: null,
  geplant: false,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'uuid',
  art_id: 'uuid',
  person_id: 'uuid',
  herkunft_id: 'uuid',
  nr: 'string',
  datum: 'date',
  von_anzahl_individuen: 'number',
  anzahl_pflanzen: 'number',
  gramm_samen: 'number',
  andere_menge: 'string',
  geplant: 'boolean',
  bemerkungen: 'string',
}
