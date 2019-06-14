import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  zaehlung_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  ort: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  anzahl_pflanzen: types.optional(types.maybeNull(types.number), null),
  anzahl_mutterpflanzen: types.optional(types.maybeNull(types.number), null),
  anzahl_auspflanzbereit: types.optional(types.maybeNull(types.number), null),
  anz_bluehend: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  menge_beschrieben: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  erscheinung: types.optional(
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
  zaehlung_id: null,
  ort: null,
  anzahl_pflanzen: null,
  anzahl_mutterpflanzen: null,
  anzahl_auspflanzbereit: null,
  menge_beschrieben: null,
  erscheinung: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  zaehlung_id: 'number',
  ort: 'string',
  anzahl_pflanzen: 'number',
  anzahl_mutterpflanzen: 'number',
  anzahl_auspflanzbereit: 'number',
  menge_beschrieben: 'string',
  erscheinung: 'string',
  bemerkungen: 'string',
}
