/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevAvgFieldsBase
 * auto generated base class for the model GartenRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const GartenRevAvgFieldsModelBase = ModelBase
  .named('GartenRevAvgFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_avg_fields"), "garten_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevAvgFields() {
  return new GartenRevAvgFieldsModelSelector()
}

export const gartenRevAvgFieldsModelPrimitives = selectFromGartenRevAvgFields()._depth.plz
