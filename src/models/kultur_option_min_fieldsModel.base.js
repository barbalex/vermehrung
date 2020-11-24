/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_option_min_fieldsBase
 * auto generated base class for the model kultur_option_min_fieldsModel.
 */
export const kultur_option_min_fieldsModelBase = ModelBase
  .named('kultur_option_min_fields')
  .props({
    __typename: types.optional(types.literal("kultur_option_min_fields"), "kultur_option_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromkultur_option_min_fields() {
  return new kultur_option_min_fieldsModelSelector()
}

export const kultur_option_min_fieldsModelPrimitives = selectFromkultur_option_min_fields()._depth._parent_rev._rev._rev_at.changed.changed_by
