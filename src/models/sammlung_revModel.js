import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { sammlung_revModelBase } from './sammlung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for sammlung_revModel */
export {
  selectFromsammlung_rev,
  sammlung_revModelPrimitives,
  sammlung_revModelSelector,
} from './sammlung_revModel.base'

/**
 * sammlung_revModel
 *
 * columns and relationships of "sammlung_rev"
 */
export const sammlung_revModel = sammlung_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteSammlungRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      sammlung_id: self.sammlung_id,
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
      revertTable: 'sammlung',
      revertId: self.sammlung_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteSammlungRevModel(self)
  },
}))
