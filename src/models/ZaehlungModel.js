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
    const { addQueuedQuery, user, upsertZaehlungModel, unsetError } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
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
      revertTable: 'zaehlung',
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
    delete newObjectForStore.zaehlung_id
    // optimistically update store
    upsertZaehlungModel(newObjectForStore)
    unsetError({ path: `zaehlung.${field}` })
    if (field === '_deleted' && value) self.deleteNSide()
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
  deleteNSide() {
    const store = getParent(self, 2)

    store.teilzaehlungsSorted
      .filter((o) => o.zaehlung_id === self.id)
      .forEach((z) => z.delete())
  },
}))
