/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { avModel } from './avModel'
import { avModelSelector } from './avModel.base'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { event_revModel } from './event_revModel'
import { event_revModelSelector } from './event_revModel.base'
import { gartenModel } from './gartenModel'
import { gartenModelSelector } from './gartenModel.base'
import { garten_revModel } from './garten_revModel'
import { garten_revModelSelector } from './garten_revModel.base'
import { gvModel } from './gvModel'
import { gvModelSelector } from './gvModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { lieferung_revModel } from './lieferung_revModel'
import { lieferung_revModelSelector } from './lieferung_revModel.base'
import { person_fileModel } from './person_fileModel'
import { person_fileModelSelector } from './person_fileModel.base'
import { person_optionModel } from './person_optionModel'
import { person_optionModelSelector } from './person_optionModel.base'
import { person_option_revModel } from './person_option_revModel'
import { person_option_revModelSelector } from './person_option_revModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammel_lieferung_revModel } from './sammel_lieferung_revModel'
import { sammel_lieferung_revModelSelector } from './sammel_lieferung_revModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'
import { sammlung_revModel } from './sammlung_revModel'
import { sammlung_revModelSelector } from './sammlung_revModel.base'
import { user_roleModel } from './user_roleModel'
import { user_roleModelSelector } from './user_roleModel.base'

/**
 * personBase
 * auto generated base class for the model personModel.
 */
export const personModelBase = ModelBase.named('person')
  .props({
    __typename: types.optional(types.literal('person'), 'person'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
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
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    user_role: types.union(types.undefined, types.null, types.string),
    vorname: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class personModelSelector extends QueryBuilder {
  get _conflicts() {
    return this.__attr(`_conflicts`)
  }
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
  get user_role() {
    return this.__attr(`user_role`)
  }
  get vorname() {
    return this.__attr(`vorname`)
  }
}
export function selectFromperson() {
  return new personModelSelector()
}

export const personModelPrimitives = selectFromperson()._conflicts._deleted
  ._depth._parent_rev._rev._rev_at._revisions.account_id.adresszusatz.aktiv
  .bemerkungen.changed.changed_by.email.info.kein_email.kommerziell.name.nr.ort
  .plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role.vorname
