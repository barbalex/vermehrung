import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.optional(types.maybeNull(types.number), null),
  tk: types.optional(types.boolean, false),
  tk_bemerkungen: types.optional(types.boolean, true),
  z_bemerkungen: types.optional(types.boolean, true),
  tz_teilkultur_id: types.optional(types.boolean, true),
  tz_anzahl_mutterpflanzen: types.optional(types.boolean, true),
  tz_andere_menge: types.optional(types.boolean, true),
  tz_auspflanzbereit_beschreibung: types.optional(types.boolean, true),
  tz_bemerkungen: types.optional(types.boolean, true),
  ev_teilkultur_id: types.optional(types.boolean, true),
  ev_geplant: types.optional(types.boolean, true),
  ev_person_id: types.optional(types.boolean, true),
  ev_datum: types.optional(types.boolean, true),
})

export const initial = {
  kultur_id: null,
  tk: false,
  tk_bemerkungen: true,
  z_bemerkungen: true,
  tz_teilkultur_id: true,
  tz_anzahl_mutterpflanzen: true,
  tz_andere_menge: true,
  tz_auspflanzbereit_beschreibung: true,
  tz_bemerkungen: true,
  ev_teilkultur_id: true,
  ev_geplant: true,
  ev_person_id: true,
  ev_datum: true,
}

export const empty = {
  kultur_id: null,
  tk: false,
  tk_bemerkungen: true,
  z_bemerkungen: true,
  tz_teilkultur_id: true,
  tz_anzahl_mutterpflanzen: true,
  tz_andere_menge: true,
  tz_auspflanzbereit_beschreibung: true,
  tz_bemerkungen: true,
  ev_teilkultur_id: true,
  ev_geplant: true,
  ev_person_id: true,
  ev_datum: true,
}

export const simpleTypes = {
  kultur_id: 'uuid',
  tk: 'boolean',
  tk_bemerkungen: 'boolean',
  z_bemerkungen: 'boolean',
  tz_teilkultur_id: 'boolean',
  tz_anzahl_mutterpflanzen: 'boolean',
  tz_andere_menge: 'boolean',
  tz_auspflanzbereit_beschreibung: 'boolean',
  tz_bemerkungen: 'boolean',
  ev_teilkultur_id: 'boolean',
  ev_geplant: 'boolean',
  ev_person_id: 'boolean',
  ev_datum: 'boolean',
}
