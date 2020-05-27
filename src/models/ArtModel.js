import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { artModelBase } from './artModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for artModel */
export {
  selectFromart,
  artModelPrimitives,
  artModelSelector,
} from './artModel.base'

/**
 * artModel
 */
export const artModel = artModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertArtModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      art_id: self.id,
      ae_id: value,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: depth,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    // for store: convert rev to winner
    newObjectForStore.id = newObjectForStore.art_id
    delete newObjectForStore.art_id
    addQueuedQuery({
      name: 'mutateInsert_art_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryArt',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // optimistically update store
    upsertArtModel(newObjectForStore)
    setTimeout(() => {
      if (['ae_id'].includes(field)) tree.refetch()
    }, 50)
  },
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      art_id: self.id,
      ae_id: self.ae_id,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_art_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryArt',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deleteArtModel } = store

    self.setDeleted()
    deleteArtModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
