/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevVarianceFieldsBase
 * auto generated base class for the model GartenRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const GartenRevVarianceFieldsModelBase = ModelBase
  .named('GartenRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_variance_fields"), "garten_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevVarianceFields() {
  return new GartenRevVarianceFieldsModelSelector()
}

export const gartenRevVarianceFieldsModelPrimitives = selectFromGartenRevVarianceFields()._depth.plz
