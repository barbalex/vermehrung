import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { teilzaehlungModelBase } from './teilzaehlungModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for teilzaehlungModel */
export {
  selectFromteilzaehlung,
  teilzaehlungModelPrimitives,
  teilzaehlungModelSelector,
} from './teilzaehlungModel.base'

/**
 * teilzaehlungModel
 */
export const teilzaehlungModel = teilzaehlungModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertTeilzaehlungModel, tree } = store

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      teilzaehlung_id: self.id,
      zaehlung_id: field === 'zaehlung_id' ? value : self.zaehlung_id,
      teilkultur_id: field === 'teilkultur_id' ? value : self.teilkultur_id,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : self.anzahl_pflanzen,
      anzahl_auspflanzbereit:
        field === 'anzahl_auspflanzbereit'
          ? value
          : self.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen:
        field === 'anzahl_mutterpflanzen' ? value : self.anzahl_mutterpflanzen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : self.andere_menge,
      auspflanzbereit_beschreibung:
        field === 'auspflanzbereit_beschreibung'
          ? toStringIfPossible(value)
          : self.auspflanzbereit_beschreibung,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
      prognose_von_tz:
        field === 'prognose_von_tz' ? value : self.prognose_von_tz,
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
      name: 'mutateInsert_teilzaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryTeilzaehlung',
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
    delete newObjectForStore.teilzaehlung_id
    // optimistically update store
    upsertTeilzaehlungModel(newObjectForStore)
    setTimeout(() => {
      if (['_deleted'].includes(field)) tree.refetch()
    }, 50)
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
