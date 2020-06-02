import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kulturModelBase } from './kulturModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for kulturModel */
export {
  selectFromkultur,
  kulturModelPrimitives,
  kulturModelSelector,
} from './kulturModel.base'

/**
 * kulturModel
 */
export const kulturModel = kulturModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertKulturModel, tree } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      kultur_id: self.id,
      art_id: field === 'art_id' ? value : self.art_id,
      herkunft_id: field === 'herkunft_id' ? value : self.herkunft_id,
      garten_id: field === 'garten_id' ? value : self.garten_id,
      zwischenlager: field === 'zwischenlager' ? value : self.zwischenlager,
      erhaltungskultur:
        field === 'erhaltungskultur' ? value : self.erhaltungskultur,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : self.von_anzahl_individuen,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
      aktiv: field === 'aktiv' ? value : self.aktiv,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : self._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_kultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryKultur',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    newObjectForStore._conflicts = self._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = self.id
    delete newObjectForStore.kultur_id
    // optimistically update store
    upsertKulturModel(newObjectForStore)
    setTimeout(() => {
      if (['art_id', 'herkunft_id', 'garten_id', '_deleted'].includes(field)) {
        tree.refetch()
      }
    }, 50)
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
