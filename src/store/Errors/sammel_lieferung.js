import { types } from 'mobx-state-tree'

export const type = types.model({
  art_id: types.union(types.string, types.undefined, types.null),
  person_id: types.union(types.string, types.undefined, types.null),
  von_sammlung_id: types.union(types.string, types.undefined, types.null),
  von_kultur_id: types.union(types.string, types.undefined, types.null),
  datum: types.union(types.string, types.undefined, types.null),
  nach_kultur_id: types.union(types.string, types.undefined, types.null),
  nach_ausgepflanzt: types.union(types.string, types.undefined, types.null),
  von_anzahl_individuen: types.union(types.string, types.undefined, types.null),
  anzahl_pflanzen: types.union(types.string, types.undefined, types.null),
  anzahl_auspflanzbereit: types.union(
    types.string,
    types.undefined,
    types.null,
  ),
  gramm_samen: types.union(types.string, types.undefined, types.null),
  andere_menge: types.union(types.string, types.undefined, types.null),
  geplant: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
})
