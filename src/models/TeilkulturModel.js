import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { teilkulturModelBase } from './teilkulturModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for teilkulturModel */
export {
  selectFromteilkultur,
  teilkulturModelPrimitives,
  teilkulturModelSelector,
} from './teilkulturModel.base'

/**
 * teilkulturModel
 */
export const teilkulturModel = teilkulturModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertTeilkulturModel, unsetError } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      teilkultur_id: self.id,
      kultur_id: field === 'kultur_id' ? value : self.kultur_id,
      name: field === 'name' ? toStringIfPossible(value) : self.name,
      ort1: field === 'ort1' ? toStringIfPossible(value) : self.ort1,
      ort2: field === 'ort2' ? toStringIfPossible(value) : self.ort2,
      ort3: field === 'ort3' ? toStringIfPossible(value) : self.ort3,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
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
      name: 'mutateInsert_teilkultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryTeilkultur',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'teilkultur',
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
    delete newObjectForStore.teilkultur_id
    // optimistically update store
    upsertTeilkulturModel(newObjectForStore)
    unsetError({ path: `teilkultur.${field}` })
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
