/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturSumFieldsBase
 * auto generated base class for the model TeilkulturSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const TeilkulturSumFieldsModelBase = ModelBase
  .named('TeilkulturSumFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_sum_fields"), "teilkultur_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturSumFields() {
  return new TeilkulturSumFieldsModelSelector()
}

export const teilkulturSumFieldsModelPrimitives = selectFromTeilkulturSumFields()._depth
