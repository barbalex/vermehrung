/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_qk_choosen_min_fieldsBase
 * auto generated base class for the model kultur_qk_choosen_min_fieldsModel.
 */
export const kultur_qk_choosen_min_fieldsModelBase = ModelBase
  .named('kultur_qk_choosen_min_fields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_min_fields"), "kultur_qk_choosen_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    qk_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get qk_id() { return this.__attr(`qk_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
}
export function selectFromkultur_qk_choosen_min_fields() {
  return new kultur_qk_choosen_min_fieldsModelSelector()
}

export const kultur_qk_choosen_min_fieldsModelPrimitives = selectFromkultur_qk_choosen_min_fields()._depth._parent_rev._rev._rev_at.changed.changed_by.kultur_id.qk_id.qk_name
