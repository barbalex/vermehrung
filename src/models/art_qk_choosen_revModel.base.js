/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"


/**
 * art_qk_choosen_revBase
 * auto generated base class for the model art_qk_choosen_revModel.
 */
export const art_qk_choosen_revModelBase = ModelBase
  .named('art_qk_choosen_rev')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_rev"), "art_qk_choosen_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    art: types.union(types.undefined, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.frozen()),
    art_qk: types.union(types.undefined, MSTGQLRef(types.late(() => art_qkModel))),
    art_qk_choosen_id: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    choosen: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    qk_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get art_id() { return this.__attr(`art_id`) }
  get art_qk_choosen_id() { return this.__attr(`art_qk_choosen_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get choosen() { return this.__attr(`choosen`) }
  get id() { return this.__attr(`id`) }
  get qk_id() { return this.__attr(`qk_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  art_qk(builder) { return this.__child(`art_qk`, art_qkModelSelector, builder) }
}
export function selectFromart_qk_choosen_rev() {
  return new art_qk_choosen_revModelSelector()
}

export const art_qk_choosen_revModelPrimitives = selectFromart_qk_choosen_rev()._deleted._depth._parent_rev._rev._rev_at._revisions.art_id.art_qk_choosen_id.changed.changed_by.choosen.qk_id.qk_name
