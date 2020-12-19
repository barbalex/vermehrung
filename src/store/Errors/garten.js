import { types } from 'mobx-state-tree'

export const type = types.model({
  name: types.union(types.string, types.undefined, types.null),
  person_id: types.union(types.string, types.undefined, types.null),
  strasse: types.union(types.string, types.undefined, types.null),
  plz: types.union(types.string, types.undefined, types.null),
  ort: types.union(types.string, types.undefined, types.null),
  geom_point: types.union(types.string, types.undefined, types.null),
  aktiv: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
})
