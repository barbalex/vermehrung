/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_option_max_fieldsBase
 * auto generated base class for the model kultur_option_max_fieldsModel.
 */
export const kultur_option_max_fieldsModelBase = ModelBase
  .named('kultur_option_max_fields')
  .props({
    __typename: types.optional(types.literal("kultur_option_max_fields"), "kultur_option_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_max_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromkultur_option_max_fields() {
  return new kultur_option_max_fieldsModelSelector()
}

export const kultur_option_max_fieldsModelPrimitives = selectFromkultur_option_max_fields()._depth._parent_rev._rev.changed.changed_by
