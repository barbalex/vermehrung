import { types } from 'mobx-state-tree'

export const type = types.model({
  nr: types.union(types.string, types.undefined, types.null),
  lokalname: types.union(types.string, types.undefined, types.null),
  gemeinde: types.union(types.string, types.undefined, types.null),
  kanton: types.union(types.string, types.undefined, types.null),
  land: types.union(types.string, types.undefined, types.null),
  geom_point: types.union(types.string, types.undefined, types.null),
})
