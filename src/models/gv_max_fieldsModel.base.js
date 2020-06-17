/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_max_fieldsBase
 * auto generated base class for the model gv_max_fieldsModel.
 */
export const gv_max_fieldsModelBase = ModelBase
  .named('gv_max_fields')
  .props({
    __typename: types.optional(types.literal("gv_max_fields"), "gv_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_max_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromgv_max_fields() {
  return new gv_max_fieldsModelSelector()
}

export const gv_max_fieldsModelPrimitives = selectFromgv_max_fields()._depth._parent_rev._rev.changed.changed_by.garten_id.person_id
