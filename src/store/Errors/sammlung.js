import { types } from 'mobx-state-tree'

export const type = types.model({
  art_id: types.union(types.string, types.undefined, types.null),
  person_id: types.union(types.string, types.undefined, types.null),
  herkunft_id: types.union(types.string, types.undefined, types.null),
  nr: types.union(types.string, types.undefined, types.null),
  datum: types.union(types.string, types.undefined, types.null),
  von_anzahl_individuen: types.union(types.string, types.undefined, types.null),
  anzahl_pflanzen: types.union(types.string, types.undefined, types.null),
  gramm_samen: types.union(types.string, types.undefined, types.null),
  andere_menge: types.union(types.string, types.undefined, types.null),
  geom_point: types.union(types.string, types.undefined, types.null),
  geplant: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
})
