/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"


/**
 * kultur_qk_choosen_revBase
 * auto generated base class for the model kultur_qk_choosen_revModel.
 */
export const kultur_qk_choosen_revModelBase = ModelBase
  .named('kultur_qk_choosen_rev')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_rev"), "kultur_qk_choosen_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    choosen: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    kultur: types.union(types.undefined, MSTGQLRef(types.late(() => kulturModel))),
    kultur_id: types.union(types.undefined, types.frozen()),
    kultur_qk_choosen_id: types.union(types.undefined, types.null, types.frozen()),
    qk_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get choosen() { return this.__attr(`choosen`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get kultur_qk_choosen_id() { return this.__attr(`kultur_qk_choosen_id`) }
  get qk_id() { return this.__attr(`qk_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  kultur(builder) { return this.__child(`kultur`, kulturModelSelector, builder) }
}
export function selectFromkultur_qk_choosen_rev() {
  return new kultur_qk_choosen_revModelSelector()
}

export const kultur_qk_choosen_revModelPrimitives = selectFromkultur_qk_choosen_rev()._deleted._depth._parent_rev._rev._rev_at._revisions.changed.changed_by.choosen.kultur_id.kultur_qk_choosen_id.qk_id.qk_name
