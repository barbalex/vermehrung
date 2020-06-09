import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { event_revModelBase } from './event_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for event_revModel */
export {
  selectFromevent_rev,
  event_revModelPrimitives,
  event_revModelSelector,
} from './event_revModel.base'

/**
 * event_revModel
 *
 * columns and relationships of "event_rev"
 */
export const event_revModel = event_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteEventRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      event_id: self.event_id,
      kultur_id: self.kultur_id,
      teilkultur_id: self.teilkultur_id,
      person_id: self.person_id,
      beschreibung: self.beschreibung,
      geplant: self.geplant,
      datum: self.datum,
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
      name: 'mutateInsert_event_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'event_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryEvent',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'event',
      revertId: self.event_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteEventRevModel(self)
  },
}))
