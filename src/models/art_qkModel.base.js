/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_revModel } from "./art_qk_choosen_revModel"
import { art_qk_choosen_revModelSelector } from "./art_qk_choosen_revModel.base"


/**
 * art_qkBase
 * auto generated base class for the model art_qkModel.
 */
export const art_qkModelBase = ModelBase
  .named('art_qk')
  .props({
    __typename: types.optional(types.literal("art_qk"), "art_qk"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    art_qk_choosen: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
    art_qk_choosen_aggregate: types.union(types.undefined, types.frozen()),
    art_qk_choosen_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosen_revModel)))),
    art_qk_choosen_revs_aggregate: types.union(types.undefined, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qkModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
  art_qk_choosen(builder) { return this.__child(`art_qk_choosen`, art_qk_choosenModelSelector, builder) }
  art_qk_choosen_aggregate(builder) { return this.__child(`art_qk_choosen_aggregate`, art_qk_choosen_aggregateModelSelector, builder) }
  art_qk_choosen_revs(builder) { return this.__child(`art_qk_choosen_revs`, art_qk_choosen_revModelSelector, builder) }
  art_qk_choosen_revs_aggregate(builder) { return this.__child(`art_qk_choosen_revs_aggregate`, art_qk_choosen_rev_aggregateModelSelector, builder) }
}
export function selectFromart_qk() {
  return new art_qkModelSelector()
}

export const art_qkModelPrimitives = selectFromart_qk()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.beschreibung.changed.changed_by.name.sort.titel
