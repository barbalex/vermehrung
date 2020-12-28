import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.union(types.string, types.undefined, types.null),
  datum: types.union(types.string, types.undefined, types.null),
  prognose: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
})
