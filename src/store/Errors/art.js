import { types } from 'mobx-state-tree'

export const type = types.model({
  ae_id: types.union(types.string, types.undefined, types.null),
  set: types.union(types.string, types.undefined, types.null),
  apflora_av: types.union(types.string, types.undefined, types.null),
  apflora_ap: types.union(types.boolean, types.undefined, types.null),
})
