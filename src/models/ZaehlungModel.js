import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { zaehlungModelBase } from './zaehlungModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for zaehlungModel */
export {
  selectFromzaehlung,
  zaehlungModelPrimitives,
  zaehlungModelSelector,
} from './zaehlungModel.base'

/**
 * zaehlungModel
 */
export const zaehlungModel = zaehlungModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertZaehlungModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      zaehlung_id: self.id,
      kultur_id: field === 'kultur_id' ? value : self.kultur_id,
      datum: field === 'datum' ? value : self.datum,
      prognose: field === 'prognose' ? value : self.prognose,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: depth,
      _deleted: false,
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
    addQueuedQuery({
      name: 'mutateInsert_zaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryZaehlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    // for store: convert rev to winner
    newObjectForStore.id = self.id
    delete newObjectForStore.zaehlung_id
    // optimistically update store
    upsertZaehlungModel(newObjectForStore)
    setTimeout(() => {
      if (['nr'].includes(field)) tree.refetch()
    }, 50)
  },
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertZaehlungModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      zaehlung_id: self.id,
      kultur_id: self.kultur_id,
      datum: self.datum,
      prognose: self.prognose,
      bemerkungen: self.bemerkungen,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject.id = uuidv1()
    newObject._rev = rev
    const newObjectForStore = { ...newObject }
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_zaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryZaehlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    // for store: convert rev to winner
    newObjectForStore.id = self.id
    delete newObjectForStore.zaehlung_id
    // optimistically update store
    upsertZaehlungModel(newObjectForStore)
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deleteZaehlungModel } = store

    self.setDeleted()
    deleteZaehlungModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
