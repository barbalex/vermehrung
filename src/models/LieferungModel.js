import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { lieferungModelBase } from './lieferungModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for lieferungModel */
export {
  selectFromlieferung,
  lieferungModelPrimitives,
  lieferungModelSelector,
} from './lieferungModel.base'

/**
 * lieferungModel
 */
export const lieferungModel = lieferungModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertLieferungModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      lieferung_id: self.id,
      sammel_lieferung_id:
        field === 'sammel_lieferung_id' ? value : self.sammel_lieferung_id,
      art_id: field === 'art_id' ? value : self.art_id,
      person_id: field === 'person_id' ? value : self.person_id,
      von_sammlung_id:
        field === 'von_sammlung_id' ? value : self.von_sammlung_id,
      von_kultur_id: field === 'von_kultur_id' ? value : self.von_kultur_id,
      datum: field === 'datum' ? value : self.datum,
      nach_kultur_id: field === 'nach_kultur_id' ? value : self.nach_kultur_id,
      nach_ausgepflanzt:
        field === 'nach_ausgepflanzt' ? value : self.nach_ausgepflanzt,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : self.von_anzahl_individuen,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : self.anzahl_pflanzen,
      anzahl_auspflanzbereit:
        field === 'anzahl_auspflanzbereit'
          ? value
          : self.anzahl_auspflanzbereit,
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
      name: 'mutateInsert_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryLieferung',
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
    delete newObjectForStore.lieferung_id
    // optimistically update store
    upsertLieferungModel(newObjectForStore)
    if (
      ['nach_kultur_id', 'von_kultur_id', 'von_sammlung_id', 'art_id'].includes(
        field,
      )
    ) {
      tree.refetch()
    }
  },
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertLieferungModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      lieferung_id: self.id,
      sammel_lieferung_id: self.sammel_lieferung_id,
      art_id: self.art_id,
      person_id: self.person_id,
      von_sammlung_id: self.von_sammlung_id,
      von_kultur_id: self.von_kultur_id,
      datum: self.datum,
      nach_kultur_id: self.nach_kultur_id,
      nach_ausgepflanzt: self.nach_ausgepflanzt,
      von_anzahl_individuen: self.von_anzahl_individuen,
      anzahl_pflanzen: self.anzahl_pflanzen,
      anzahl_auspflanzbereit: self.anzahl_auspflanzbereit,
      gramm_samen: self.gramm_samen,
      andere_menge: self.andere_menge,
      geplant: self.geplant,
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
      name: 'mutateInsert_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryLieferung',
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
    delete newObjectForStore.lieferung_id
    // optimistically update store
    upsertLieferungModel(newObjectForStore)
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deleteLieferungModel } = store

    self.setDeleted()
    deleteLieferungModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
