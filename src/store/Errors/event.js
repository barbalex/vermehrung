import { types } from 'mobx-state-tree'

export const type = types.model({
  kultur_id: types.union(types.string, types.undefined, types.null),
  teilkultur_id: types.union(types.string, types.undefined, types.null),
  person_id: types.union(types.string, types.undefined, types.null),
  beschreibung: types.union(types.string, types.undefined, types.null),
  geplant: types.union(types.string, types.undefined, types.null),
  datum: types.union(types.string, types.undefined, types.null),
})
