/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_rev_min_fieldsBase
 * auto generated base class for the model art_qk_rev_min_fieldsModel.
 */
export const art_qk_rev_min_fieldsModelBase = ModelBase
  .named('art_qk_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_rev_min_fields"), "art_qk_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    art_qk_id: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get art_qk_id() { return this.__attr(`art_qk_id`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromart_qk_rev_min_fields() {
  return new art_qk_rev_min_fieldsModelSelector()
}

export const art_qk_rev_min_fieldsModelPrimitives = selectFromart_qk_rev_min_fields()._depth._parent_rev._rev._rev_at.art_qk_id.beschreibung.changed.changed_by.name.sort.titel
