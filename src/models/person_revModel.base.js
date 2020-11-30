/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { avModel } from './avModel'
import { avModelSelector } from './avModel.base'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { gartenModel } from './gartenModel'
import { gartenModelSelector } from './gartenModel.base'
import { person_fileModel } from './person_fileModel'
import { person_fileModelSelector } from './person_fileModel.base'
import { person_optionModel } from './person_optionModel'
import { person_optionModelSelector } from './person_optionModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'

/**
 * person_revBase
 * auto generated base class for the model person_revModel.
 */
export const person_revModelBase = ModelBase.named('person_rev')
  .props({
    __typename: types.optional(types.literal('person_rev'), 'person_rev'),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    account_id: types.union(types.undefined, types.null, types.string),
    adresszusatz: types.union(types.undefined, types.null, types.string),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    info: types.union(types.undefined, types.null, types.boolean),
    kein_email: types.union(types.undefined, types.null, types.boolean),
    kommerziell: types.union(types.undefined, types.null, types.boolean),
    name: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    user_role_id: types.union(types.undefined, types.null, types.frozen()),
    vorname: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class person_revModelSelector extends QueryBuilder {
  get _deleted() {
    return this.__attr(`_deleted`)
  }
  get _depth() {
    return this.__attr(`_depth`)
  }
  get _parent_rev() {
    return this.__attr(`_parent_rev`)
  }
  get _rev() {
    return this.__attr(`_rev`)
  }
  get _rev_at() {
    return this.__attr(`_rev_at`)
  }
  get _revisions() {
    return this.__attr(`_revisions`)
  }
  get account_id() {
    return this.__attr(`account_id`)
  }
  get adresszusatz() {
    return this.__attr(`adresszusatz`)
  }
  get aktiv() {
    return this.__attr(`aktiv`)
  }
  get bemerkungen() {
    return this.__attr(`bemerkungen`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get email() {
    return this.__attr(`email`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get info() {
    return this.__attr(`info`)
  }
  get kein_email() {
    return this.__attr(`kein_email`)
  }
  get kommerziell() {
    return this.__attr(`kommerziell`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get nr() {
    return this.__attr(`nr`)
  }
  get ort() {
    return this.__attr(`ort`)
  }
  get person_id() {
    return this.__attr(`person_id`)
  }
  get plz() {
    return this.__attr(`plz`)
  }
  get strasse() {
    return this.__attr(`strasse`)
  }
  get telefon_geschaeft() {
    return this.__attr(`telefon_geschaeft`)
  }
  get telefon_mobile() {
    return this.__attr(`telefon_mobile`)
  }
  get telefon_privat() {
    return this.__attr(`telefon_privat`)
  }
  get user_role_id() {
    return this.__attr(`user_role_id`)
  }
  get vorname() {
    return this.__attr(`vorname`)
  }
}
export function selectFromperson_rev() {
  return new person_revModelSelector()
}

export const person_revModelPrimitives = selectFromperson_rev()._deleted._depth
  ._parent_rev._rev._rev_at._revisions.account_id.adresszusatz.aktiv.bemerkungen
  .changed.changed_by.email.info.kein_email.kommerziell.name.nr.ort.person_id
  .plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role_id
  .vorname
