import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { person_revModelBase } from './person_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for person_revModel */
export {
  selectFromperson_rev,
  person_revModelPrimitives,
  person_revModelSelector,
} from './person_revModel.base'

/**
 * person_revModel
 *
 * columns and relationships of "person_rev"
 */
export const person_revModel = person_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deletePersonRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      person_id: self.person_id,
      nr: self.nr,
      name: self.name,
      adresszusatz: self.adresszusatz,
      strasse: self.strasse,
      plz: self.plz,
      ort: self.ort,
      telefon_privat: self.telefon_privat,
      telefon_geschaeft: self.telefon_geschaeft,
      telefon_mobile: self.telefon_mobile,
      email: self.email,
      kein_email: self.kein_email,
      bemerkungen: self.bemerkungen,
      account_id: self.account_id,
      user_role: self.user_role,
      kommerziell: self.kommerziell,
      info: self.info,
      aktiv: self.aktiv,
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
      name: 'mutateInsert_person_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryPerson',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    deletePersonRevModel(self)
  },
}))
