import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_qkModelBase } from './kultur_qkModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for kultur_qkModel */
export {
  selectFromkultur_qk,
  kultur_qkModelPrimitives,
  kultur_qkModelSelector,
} from './kultur_qkModel.base'

/**
 * kultur_qkModel
 *
 * columns and relationships of "kultur_qk"
 */
export const kultur_qkModel = kultur_qkModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertKulturQkModel, unsetError } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      kultur_qk_id: self.id,
      name: field === 'name' ? toStringIfPossible(value) : self.name,
      titel: field === 'titel' ? toStringIfPossible(value) : self.titel,
      beschreibung:
        field === 'beschreibung'
          ? toStringIfPossible(value)
          : self.beschreibung,
      sort: field === 'sort' ? value : self.sort,
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
      name: 'mutateInsert_kultur_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryKultur_qk',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'kultur_qk',
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
    delete newObjectForStore.kultur_qk_id
    // optimistically update store
    upsertKulturQkModel(newObjectForStore)
    unsetError({ path: `kultur_qk.${field}` })
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
