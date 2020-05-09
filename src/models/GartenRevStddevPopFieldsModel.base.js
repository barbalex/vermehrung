/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevStddevPopFieldsBase
 * auto generated base class for the model GartenRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const GartenRevStddevPopFieldsModelBase = ModelBase
  .named('GartenRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_stddev_pop_fields"), "garten_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevStddevPopFields() {
  return new GartenRevStddevPopFieldsModelSelector()
}

export const gartenRevStddevPopFieldsModelPrimitives = selectFromGartenRevStddevPopFields()._depth.plz
