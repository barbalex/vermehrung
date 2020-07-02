import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_qk_choosenModelBase } from './kultur_qk_choosenModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for kultur_qk_choosenModel */
export {
  selectFromkultur_qk_choosen,
  kultur_qk_choosenModelPrimitives,
  kultur_qk_choosenModelSelector,
} from './kultur_qk_choosenModel.base'

/**
 * kultur_qk_choosenModel
 *
 * columns and relationships of "kultur_qk_choosen"
 */
export const kultur_qk_choosenModel = kultur_qk_choosenModelBase.actions(
  (self) => ({
    edit({ field, value }) {
      const store = getParent(self, 2)
      const {
        addQueuedQuery,
        user,
        upsertKulturQkChoosenModel,
        unsetError,
      } = store

      // first build the part that will be revisioned
      const newDepth = self._depth + 1
      const newObject = {
        kultur_qk_choosen_id: self.id,
        kultur_id: field === 'kultur_id' ? value : self.kultur_id,
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
        name: 'mutateInsert_kultur_qk_choosen_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'kultur_qk_choosen_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryKultur_qk_choosen',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: self.id } },
        }),
        revertTable: 'kultur_qk_choosen',
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
      delete newObjectForStore.kultur_qk_choosen_id
      // optimistically update store
      upsertKulturQkChoosenModel(newObjectForStore)
      unsetError({ path: `herkunft.${field}` })
    },
    delete() {
      self.edit({ field: '_deleted', value: true })
    },
  }),
)
