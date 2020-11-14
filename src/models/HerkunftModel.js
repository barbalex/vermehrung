import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { herkunftModelBase } from './HerkunftModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for herkunftModel */
export {
  selectFromherkunft,
  herkunftModelPrimitives,
  herkunftModelSelector,
} from './HerkunftModel.base'

/**
 * herkunftModel
 */
export const herkunftModel = herkunftModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertHerkunftModel, unsetError } = store

    unsetError(`herkunft.${field}`)
    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      herkunft_id: self.id,
      nr: field === 'nr' ? toStringIfPossible(value) : self.nr,
      lokalname:
        field === 'lokalname' ? toStringIfPossible(value) : self.lokalname,
      gemeinde:
        field === 'gemeinde' ? toStringIfPossible(value) : self.gemeinde,
      kanton: field === 'kanton' ? toStringIfPossible(value) : self.kanton,
      land: field === 'land' ? toStringIfPossible(value) : self.land,
      geom_point: field === 'geom_point' ? value : self.geom_point,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
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
      name: 'mutateInsert_herkunft_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'herkunft',
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
    // for store: convert herkuft_rev to herkunft
    newObjectForStore.id = self.id
    delete newObjectForStore.herkunft_id
    // optimistically update store
    upsertHerkunftModel(newObjectForStore)
    if (field === '_deleted' && value) self.deleteNSide()
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
  deleteNSide() {
    const store = getParent(self, 2)

    store.sammlungsSorted
      .filter((o) => o.herkunft_id === self.id)
      .forEach((z) => z.delete())
  },
}))
