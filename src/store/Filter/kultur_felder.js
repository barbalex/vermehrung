import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.optional(types.maybeNull(types.number), null),
  tk: types.optional(types.boolean, false),
  tk_bemerkungen: types.optional(types.boolean, true),
  z_geplant: types.optional(types.boolean, true),
  z_bemerkungen: types.optional(types.boolean, true),
  tz_teilkultur_id: types.optional(types.boolean, true),
  tz_anzahl_mutterpflanzen: types.optional(types.boolean, true),
  tz_andere_menge: types.optional(types.boolean, true),
  tz_auspflanzbereit_beschreibung: types.optional(types.boolean, true),
  tz_bemerkungen: types.optional(types.boolean, true),
  ag_teilkultur_id: types.optional(types.boolean, true),
  ag_geplant: types.optional(types.boolean, true),
  ag_person_id: types.optional(types.boolean, true),
})

export const initial = {
  kultur_id: null,
  tk: false,
  tk_bemerkungen: true,
  z_geplant: true,
  z_bemerkungen: true,
  tz_teilkultur_id: true,
  tz_anzahl_mutterpflanzen: true,
  tz_andere_menge: true,
  tz_auspflanzbereit_beschreibung: true,
  tz_bemerkungen: true,
  ag_teilkultur_id: true,
  ag_geplant: true,
  ag_person_id: true,
}

export const empty = {
  kultur_id: null,
  tk: false,
  tk_bemerkungen: true,
  z_geplant: true,
  z_bemerkungen: true,
  tz_teilkultur_id: true,
  tz_anzahl_mutterpflanzen: true,
  tz_andere_menge: true,
  tz_auspflanzbereit_beschreibung: true,
  tz_bemerkungen: true,
  ag_teilkultur_id: true,
  ag_geplant: true,
  ag_person_id: true,
}

export const simpleTypes = {
  kultur_id: 'number',
  tk: 'boolean',
  tk_bemerkungen: 'boolean',
  z_geplant: 'boolean',
  z_bemerkungen: 'boolean',
  tz_teilkultur_id: 'boolean',
  tz_anzahl_mutterpflanzen: 'boolean',
  tz_andere_menge: 'boolean',
  tz_auspflanzbereit_beschreibung: 'boolean',
  tz_bemerkungen: 'boolean',
  ag_teilkultur_id: 'boolean',
  ag_geplant: 'boolean',
  ag_person_id: 'boolean',
}
