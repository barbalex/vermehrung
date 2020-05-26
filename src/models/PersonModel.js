import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { personModelBase } from './personModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'

/* A graphql query fragment builders for personModel */
export {
  selectFromperson,
  personModelPrimitives,
  personModelSelector,
} from './personModel.base'

/**
 * personModel
 */
export const personModel = personModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertPersonModel, tree } = store

    // first build the part that will be revisioned
    const depth = self._depth + 1
    const newObject = {
      person_id: self.id,
      nr: field === 'nr' ? toStringIfPossible(value) : self.nr,
      name: field === 'name' ? toStringIfPossible(value) : self.name,
      adresszusatz:
        field === 'adresszusatz'
          ? toStringIfPossible(value)
          : self.adresszusatz,
      strasse: field === 'strasse' ? toStringIfPossible(value) : self.strasse,
      plz: field === 'plz' ? value : self.plz,
      ort: field === 'ort' ? toStringIfPossible(value) : self.ort,
      telefon_privat:
        field === 'telefon_privat'
          ? toStringIfPossible(value)
          : self.telefon_privat,
      telefon_geschaeft:
        field === 'telefon_geschaeft'
          ? toStringIfPossible(value)
          : self.telefon_geschaeft,
      telefon_mobile:
        field === 'telefon_mobile'
          ? toStringIfPossible(value)
          : self.telefon_mobile,
      email: field === 'email' ? toStringIfPossible(value) : self.email,
      kein_email: field === 'kein_email' ? value : self.kein_email,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : self.bemerkungen,
      account_id:
        field === 'account_id' ? toStringIfPossible(value) : self.account_id,
      user_role:
        field === 'user_role' ? toStringIfPossible(value) : self.user_role,
      kommerziell: field === 'kommerziell' ? value : self.kommerziell,
      info: field === 'info' ? value : self.info,
      aktiv: field === 'aktiv' ? value : self.aktiv,
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
    // optimistically update store
    upsertPersonModel(newObjectForStore)
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
      person_id: self.id,
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
  },
  delete() {
    const store = getParent(self, 2)
    const { tree, deletePersonModel } = store

    self.setDeleted()
    deletePersonModel({ id: self.id })
    setTimeout(() => {
      tree.refetch()
    }, 50)
  },
}))
