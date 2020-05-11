/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_rev_min_fieldsBase
 * auto generated base class for the model person_rev_min_fieldsModel.
 *
 * aggregate min on columns
 */
export const person_rev_min_fieldsModelBase = ModelBase
  .named('person_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("person_rev_min_fields"), "person_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    account_id: types.union(types.undefined, types.null, types.string),
    adresszusatz: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    user_role: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get account_id() { return this.__attr(`account_id`) }
  get adresszusatz() { return this.__attr(`adresszusatz`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get email() { return this.__attr(`email`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get nr() { return this.__attr(`nr`) }
  get ort() { return this.__attr(`ort`) }
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  get telefon_geschaeft() { return this.__attr(`telefon_geschaeft`) }
  get telefon_mobile() { return this.__attr(`telefon_mobile`) }
  get telefon_privat() { return this.__attr(`telefon_privat`) }
  get user_role() { return this.__attr(`user_role`) }
}
export function selectFromperson_rev_min_fields() {
  return new person_rev_min_fieldsModelSelector()
}

export const person_rev_min_fieldsModelPrimitives = selectFromperson_rev_min_fields()._depth._parent_rev._rev.account_id.adresszusatz.bemerkungen.changed.changed_by.email.name.nr.ort.plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role
