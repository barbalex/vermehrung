/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_rev_min_fieldsBase
 * auto generated base class for the model garten_rev_min_fieldsModel.
 */
export const garten_rev_min_fieldsModelBase = ModelBase
  .named('garten_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("garten_rev_min_fields"), "garten_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    rev_id: types.identifier,
    strasse: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get ort() { return this.__attr(`ort`) }
  get person_id() { return this.__attr(`person_id`) }
  get plz() { return this.__attr(`plz`) }
  get rev_id() { return this.__attr(`rev_id`) }
  get strasse() { return this.__attr(`strasse`) }
}
export function selectFromgarten_rev_min_fields() {
  return new garten_rev_min_fieldsModelSelector()
}

export const garten_rev_min_fieldsModelPrimitives = selectFromgarten_rev_min_fields()._depth._parent_rev._rev.bemerkungen.changed.changed_by.name.ort.person_id.plz.rev_id.strasse
