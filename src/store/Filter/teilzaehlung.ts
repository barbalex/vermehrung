export const initial = {
  id: null,
  zaehlung_id: null,
  teilkultur_id: null,
  anzahl_pflanzen: null,
  anzahl_mutterpflanzen: null,
  anzahl_auspflanzbereit: null,
  andere_menge: null,
  auspflanzbereit_beschreibung: null,
  bemerkungen: null,
  _deleted: false,
}

export const empty = {
  id: null,
  zaehlung_id: null,
  teilkultur_id: null,
  anzahl_pflanzen: null,
  anzahl_mutterpflanzen: null,
  anzahl_auspflanzbereit: null,
  andere_menge: null,
  auspflanzbereit_beschreibung: null,
  bemerkungen: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  zaehlung_id: 'uuid',
  teilkultur_id: 'uuid',
  anzahl_pflanzen: 'number',
  anzahl_mutterpflanzen: 'number',
  anzahl_auspflanzbereit: 'number',
  andere_menge: 'string',
  auspflanzbereit_beschreibung: 'string',
  bemerkungen: 'string',
  _deleted: 'boolean',
}
