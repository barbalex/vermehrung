/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_option_rev_max_fieldsBase
 * auto generated base class for the model kultur_option_rev_max_fieldsModel.
 */
export const kultur_option_rev_max_fieldsModelBase = ModelBase
  .named('kultur_option_rev_max_fields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_max_fields"), "kultur_option_rev_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    rev_id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_rev_max_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get id() { return this.__attr(`id`) }
  get rev_id() { return this.__attr(`rev_id`) }
}
export function selectFromkultur_option_rev_max_fields() {
  return new kultur_option_rev_max_fieldsModelSelector()
}

export const kultur_option_rev_max_fieldsModelPrimitives = selectFromkultur_option_rev_max_fields()._depth._parent_rev._rev.rev_id
