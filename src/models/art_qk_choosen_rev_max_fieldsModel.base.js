/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_choosen_rev_max_fieldsBase
 * auto generated base class for the model art_qk_choosen_rev_max_fieldsModel.
 */
export const art_qk_choosen_rev_max_fieldsModelBase = ModelBase
  .named('art_qk_choosen_rev_max_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_rev_max_fields"), "art_qk_choosen_rev_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    art_qk_choosen_id: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    qk_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_rev_max_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get art_id() { return this.__attr(`art_id`) }
  get art_qk_choosen_id() { return this.__attr(`art_qk_choosen_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get qk_id() { return this.__attr(`qk_id`) }
}
export function selectFromart_qk_choosen_rev_max_fields() {
  return new art_qk_choosen_rev_max_fieldsModelSelector()
}

export const art_qk_choosen_rev_max_fieldsModelPrimitives = selectFromart_qk_choosen_rev_max_fields()._depth._parent_rev._rev._rev_at.art_id.art_qk_choosen_id.changed.changed_by.qk_id
