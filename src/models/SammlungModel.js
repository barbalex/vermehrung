import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { sammlungModelBase } from './sammlungModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for sammlungModel */
export {
  selectFromsammlung,
  sammlungModelPrimitives,
  sammlungModelSelector,
} from './sammlungModel.base'

/**
 * sammlungModel
 */
export const sammlungModel = sammlungModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertSammlungModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      sammlung_id: self.id,
      art_id: field === 'art_id' ? value : self.art_id,
      person_id: field === 'person_id' ? value : self.person_id,
      herkunft_id: field === 'herkunft_id' ? value : self.herkunft_id,
      nr: field === 'nr' ? toStringIfPossible(value) : self.nr,
      geom_point: field === 'geom_point' ? value : self.geom_point,
      datum: field === 'datum' ? value : self.datum,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : self.von_anzahl_individuen,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : self.anzahl_pflanzen,
      gramm_samen: field === 'gramm_samen' ? value : self.gramm_samen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : self.andere_menge,
      geplant: field === 'geplant' ? value : self.geplant,
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
    // for store: convert rev to winner
    newObjectForStore.id = newObjectForStore.sammlung_id
    delete newObjectForStore.sammlung_id
    addQueuedQuery({
      name: 'mutateInsert_sammlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'querySammlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    // optimistically update store
    upsertSammlungModel(newObjectForStore)
    setTimeout(() => {
      if (['herkunft_id', 'person_id', 'art_id', 'nr'].includes(field)) {
        tree.refetch()
      }
    }, 50)
  },
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      sammlung_id: self.id,
      art_id: self.art_id,
      person_id: self.person_id,
      herkunft_id: self.herkunft_id,
      nr: self.nr,
      datum: self.datum,
      von_anzahl_individuen: self.von_anzahl_individuen,
      anzahl_pflanzen: self.anzahl_pflanzen,
      gramm_samen: self.gramm_samen,
      andere_menge: self.andere_menge,
      geom_point: self.geom_point,
      geplant: self.geplant,
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
      name: 'mutateInsert_sammlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'querySammlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deleteSammlungModel } = store

    self.setDeleted()
    deleteSammlungModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
