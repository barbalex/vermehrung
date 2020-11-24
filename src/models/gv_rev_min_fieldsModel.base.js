/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_rev_min_fieldsBase
 * auto generated base class for the model gv_rev_min_fieldsModel.
 */
export const gv_rev_min_fieldsModelBase = ModelBase
  .named('gv_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("gv_rev_min_fields"), "gv_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    gv_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get gv_id() { return this.__attr(`gv_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromgv_rev_min_fields() {
  return new gv_rev_min_fieldsModelSelector()
}

export const gv_rev_min_fieldsModelPrimitives = selectFromgv_rev_min_fields()._depth._parent_rev._rev._rev_at.changed.changed_by.garten_id.gv_id.person_id
