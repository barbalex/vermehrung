/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_option_rev_sum_fieldsBase
 * auto generated base class for the model person_option_rev_sum_fieldsModel.
 *
 * aggregate sum on columns
 */
export const person_option_rev_sum_fieldsModelBase = ModelBase
  .named('person_option_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_sum_fields"), "person_option_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_option_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromperson_option_rev_sum_fields() {
  return new person_option_rev_sum_fieldsModelSelector()
}

export const person_option_rev_sum_fieldsModelPrimitives = selectFromperson_option_rev_sum_fields()._depth
