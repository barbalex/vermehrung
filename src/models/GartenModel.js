import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { gartenModelBase } from './gartenModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for gartenModel */
export {
  selectFromgarten,
  gartenModelPrimitives,
  gartenModelSelector,
} from './gartenModel.base'

/**
 * gartenModel
 */
export const gartenModel = gartenModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertGartenModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      garten_id: self.id,
      name: field === 'name' ? toStringIfPossible(value) : self.name,
      person_id: field === 'person_id' ? value : self.person_id,
      strasse: field === 'strasse' ? toStringIfPossible(value) : self.strasse,
      plz: field === 'plz' ? value : self.plz,
      ort: field === 'ort' ? toStringIfPossible(value) : self.ort,
      geom_point: field === 'geom_point' ? value : self.geom_point,
      aktiv: field === 'aktiv' ? value : self.aktiv,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
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
    addQueuedQuery({
      name: 'mutateInsert_garten_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryGarten',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // optimistically update store
    upsertGartenModel(newObjectForStore)
    setTimeout(() => {
      if (['name'].includes(field)) tree.refetch()
    }, 50)
  },
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      garten_id: self.id,
      name: self.name,
      person_id: self.person_id,
      strasse: self.strasse,
      plz: self.plz,
      ort: self.ort,
      geom_point: self.geom_point,
      aktiv: self.aktiv,
      bemerkungen: self.bemerkungen,
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
      name: 'mutateInsert_garten_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryGarten',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deleteGartenModel } = store

    self.setDeleted()
    deleteGartenModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
