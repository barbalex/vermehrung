import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  datum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anzahl_pflanzen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anzahl_mutter_pflanzen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anz_nicht_auspflanzbereit: types.optional(
    types.maybeNull(types.number),
    null,
  ),
  anz_auspflanzbereit: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anz_bluehend: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
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
  kultur_id: null,
  datum: null,
  anzahl_pflanzen: null,
  anzahl_mutter_pflanzen: null,
  anz_nicht_auspflanzbereit: null,
  anz_auspflanzbereit: null,
  anz_bluehend: null,
  bluehdatum: null,
  instruktion: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  kultur_id: 'string',
  datum: 'string',
  anzahl_pflanzen: 'number',
  anzahl_mutter_pflanzen: 'number',
  anz_nicht_auspflanzbereit: 'number',
  anz_auspflanzbereit: 'number',
  anz_bluehend: 'number',
  bluehdatum: 'string',
  instruktion: 'string',
  bemerkungen: 'string',
}
