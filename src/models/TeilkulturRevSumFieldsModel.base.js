/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevSumFieldsBase
 * auto generated base class for the model TeilkulturRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const TeilkulturRevSumFieldsModelBase = ModelBase
  .named('TeilkulturRevSumFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_sum_fields"), "teilkultur_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevSumFields() {
  return new TeilkulturRevSumFieldsModelSelector()
}

export const teilkulturRevSumFieldsModelPrimitives = selectFromTeilkulturRevSumFields()._depth
