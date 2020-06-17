import { types } from 'mobx-state-tree'

export const type = types.model({
  art_id: types.union(types.string, types.undefined, types.null),
  herkunft_id: types.union(types.string, types.undefined, types.null),
  garten_id: types.union(types.string, types.undefined, types.null),
  zwischenlager: types.union(types.string, types.undefined, types.null),
  erhaltungskultur: types.union(types.string, types.undefined, types.null),
  von_anzahl_individuen: types.union(types.string, types.undefined, types.null),
  bemerkungen: types.union(types.string, types.undefined, types.null),
  aktiv: types.union(types.string, types.undefined, types.null),
})
