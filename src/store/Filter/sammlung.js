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
  anzahl_auspflanzbereit: types.optional(types.maybeNull(types.number), null),
  menge_beschrieben: types.optional(
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
  art_id: null,
  person_id: null,
  herkunft_id: null,
  nr: null,
  datum: null,
  von_anzahl_individuen: null,
  anzahl_pflanzen: null,
  anzahl_auspflanzbereit: null,
  menge_beschrieben: null,
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
  anzahl_auspflanzbereit: null,
  menge_beschrieben: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  art_id: 'number',
  person_id: 'number',
  herkunft_id: 'number',
  nr: 'string',
  datum: 'string',
  von_anzahl_individuen: 'number',
  anzahl_pflanzen: 'number',
  anzahl_auspflanzbereit: 'number',
  menge_beschrieben: 'string',
  bemerkungen: 'string',
}
