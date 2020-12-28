import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.union(types.string, types.undefined, types.null),
  name: types.union(types.string, types.undefined, types.null),
  ort1: types.union(types.string, types.undefined, types.null),
  ort2: types.union(types.string, types.undefined, types.null),
  ort3: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
})
