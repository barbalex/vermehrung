import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  z_bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  tz_ort: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  tz_anzahl_mutterpflanzen: types.optional(types.maybeNull(types.number), null),
  tz_menge_beschrieben: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  tz_erscheinung: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  tz_bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  kultur_id: null,
  z_bemerkungen: null,
  tz_ort: null,
  tz_anzahl_mutterpflanzen: null,
  tz_menge_beschrieben: null,
  tz_erscheinung: null,
  tz_bemerkungen: null,
}

export const empty = {
  kultur_id: null,
  z_bemerkungen: null,
  tz_ort: null,
  tz_anzahl_mutterpflanzen: null,
  tz_menge_beschrieben: null,
  tz_erscheinung: null,
  tz_bemerkungen: null,
}

export const simpleTypes = {
  kultur_id: 'number',
  z_bemerkungen: 'string',
  tz_ort: 'string',
  tz_anzahl_mutterpflanzen: 'number',
  tz_menge_beschrieben: 'string',
  tz_erscheinung: 'string',
  tz_bemerkungen: 'string',
}
