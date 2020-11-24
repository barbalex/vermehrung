/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_min_fieldsBase
 * auto generated base class for the model av_min_fieldsModel.
 */
export const av_min_fieldsModelBase = ModelBase
  .named('av_min_fields')
  .props({
    __typename: types.optional(types.literal("av_min_fields"), "av_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get art_id() { return this.__attr(`art_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromav_min_fields() {
  return new av_min_fieldsModelSelector()
}

export const av_min_fieldsModelPrimitives = selectFromav_min_fields()._depth._parent_rev._rev._rev_at.art_id.changed.changed_by.person_id
