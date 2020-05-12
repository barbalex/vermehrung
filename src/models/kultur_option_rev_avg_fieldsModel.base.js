/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_option_rev_avg_fieldsBase
 * auto generated base class for the model kultur_option_rev_avg_fieldsModel.
 */
export const kultur_option_rev_avg_fieldsModelBase = ModelBase
  .named('kultur_option_rev_avg_fields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_avg_fields"), "kultur_option_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_rev_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromkultur_option_rev_avg_fields() {
  return new kultur_option_rev_avg_fieldsModelSelector()
}

export const kultur_option_rev_avg_fieldsModelPrimitives = selectFromkultur_option_rev_avg_fields()._depth
