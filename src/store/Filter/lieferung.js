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
  von_datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_sammlung_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nach_ausgepflanzt: types.optional(types.boolean, false),
  status: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  von_anzahl_individuen: types.optional(types.maybeNull(types.number), null),
  anzahl_pflanzen: types.optional(types.maybeNull(types.number), null),
  anzahl_auspflanzbereit: types.optional(types.maybeNull(types.number), null),
  gramm_samen: types.optional(types.maybeNull(types.number), null),
  andere_menge: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
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
  von_datum: null,
  von_sammlung_id: null,
  von_kultur_id: null,
  nach_datum: null,
  nach_kultur_id: null,
  nach_ausgepflanzt: false,
  von_anzahl_individuen: null,
  anzahl_pflanzen: null,
  anzahl_auspflanzbereit: null,
  gramm_samen: null,
  andere_menge: null,
  geplant: false,
  bemerkungen: null,
}

export const empty = {
  id: null,
  art_id: null,
  person_id: null,
  von_datum: null,
  von_sammlung_id: null,
  von_kultur_id: null,
  nach_datum: null,
  nach_kultur_id: null,
  nach_ausgepflanzt: false,
  von_anzahl_individuen: null,
  anzahl_pflanzen: null,
  anzahl_auspflanzbereit: null,
  gramm_samen: null,
  andere_menge: null,
  geplant: false,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  art_id: 'number',
  person_id: 'number',
  von_datum: 'string',
  von_sammlung_id: 'number',
  von_kultur_id: 'number',
  nach_datum: 'string',
  nach_kultur_id: 'number',
  nach_ausgepflanzt: 'boolean',
  von_anzahl_individuen: 'number',
  anzahl_pflanzen: 'number',
  anzahl_auspflanzbereit: 'number',
  gramm_samen: 'number',
  andere_menge: 'string',
  geplant: 'boolean',
  bemerkungen: 'string',
}
