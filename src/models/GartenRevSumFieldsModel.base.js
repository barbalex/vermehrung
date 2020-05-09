/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevSumFieldsBase
 * auto generated base class for the model GartenRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const GartenRevSumFieldsModelBase = ModelBase
  .named('GartenRevSumFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_sum_fields"), "garten_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    plz: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevSumFields() {
  return new GartenRevSumFieldsModelSelector()
}

export const gartenRevSumFieldsModelPrimitives = selectFromGartenRevSumFields()._depth.plz
