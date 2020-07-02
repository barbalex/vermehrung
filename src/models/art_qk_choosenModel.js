import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { art_qk_choosenModelBase } from './art_qk_choosenModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for art_qk_choosenModel */
export {
  selectFromart_qk_choosen,
  art_qk_choosenModelPrimitives,
  art_qk_choosenModelSelector,
} from './art_qk_choosenModel.base'

/**
 * art_qk_choosenModel
 *
 * columns and relationships of "art_qk_choosen"
 */
export const art_qk_choosenModel = art_qk_choosenModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertArtQkChoosenModel, unsetError } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      art_qk_choosen_id: self.id,
      art_id: field === 'art_id' ? value : self.art_id,
      qk_name: field === 'qk_name' ? toStringIfPossible(value) : self.qk_name,
      choosen: field === 'choosen' ? value : self.choosen,
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
      name: 'mutateInsert_art_qk_choosen_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_qk_choosen_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryArt_qk_choosen',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'art_qk_choosen',
      revertId: self.id,
      revertField: field,
      revertValue: self[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    newObjectForStore._conflicts = self._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = self.id
    delete newObjectForStore.art_qk_choosen_id
    // optimistically update store
    upsertArtQkChoosenModel(newObjectForStore)
    unsetError({ path: `herkunft.${field}` })
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
