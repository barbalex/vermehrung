import { types } from 'mobx-state-tree'

export const type = types.model({
  ae_id: types.union(types.string, types.undefined, types.null),
  set: types.union(types.string, types.undefined, types.null),
})
