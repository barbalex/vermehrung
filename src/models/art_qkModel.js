import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { art_qkModelBase } from './art_qkModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for art_qkModel */
export {
  selectFromart_qk,
  art_qkModelPrimitives,
  art_qkModelSelector,
} from './art_qkModel.base'

/**
 * art_qkModel
 *
 * columns and relationships of "art_qk"
 */
export const art_qkModel = art_qkModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertArtQkModel, unsetError } = store

    unsetError(`art_qk.${field}`)
    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      art_qk_id: self.id,
      name: field === 'name' ? toStringIfPossible(value) : self.name,
      titel: field === 'titel' ? toStringIfPossible(value) : self.titel,
      beschreibung:
        field === 'beschreibung'
          ? toStringIfPossible(value)
          : self.beschreibung,
      sort: field === 'sort' ? value : self.sort,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : self._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_art_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryArt_qk',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'art_qk',
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
    delete newObjectForStore.art_qk_id
    // optimistically update store
    upsertArtQkModel(newObjectForStore)
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
