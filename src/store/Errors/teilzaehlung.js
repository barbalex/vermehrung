import { types } from 'mobx-state-tree'

export const type = types.model({
  zaehlung_id: types.union(types.string, types.undefined, types.null),
  teilkultur_id: types.union(types.string, types.undefined, types.null),
  anzahl_pflanzen: types.union(types.string, types.undefined, types.null),
  anzahl_auspflanzbereit: types.union(
    types.string,
    types.undefined,
    types.null,
  ),
  anzahl_mutterpflanzen: types.union(types.string, types.undefined, types.null),
  andere_menge: types.union(types.string, types.undefined, types.null),
  auspflanzbereit_beschreibung: types.union(
    types.string,
    types.undefined,
    types.null,
  ),
  bemerkungen: types.union(types.string, types.undefined, types.null),
  prognose_von_tz: types.union(types.string, types.undefined, types.null),
})
