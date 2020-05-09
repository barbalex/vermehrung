/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevSumFieldsBase
 * auto generated base class for the model HerkunftRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const HerkunftRevSumFieldsModelBase = ModelBase
  .named('HerkunftRevSumFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_sum_fields"), "herkunft_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevSumFields() {
  return new HerkunftRevSumFieldsModelSelector()
}

export const herkunftRevSumFieldsModelPrimitives = selectFromHerkunftRevSumFields()._depth
