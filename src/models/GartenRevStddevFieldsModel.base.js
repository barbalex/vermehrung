/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevStddevFieldsBase
 * auto generated base class for the model GartenRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const GartenRevStddevFieldsModelBase = ModelBase
  .named('GartenRevStddevFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_stddev_fields"), "garten_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevStddevFields() {
  return new GartenRevStddevFieldsModelSelector()
}

export const gartenRevStddevFieldsModelPrimitives = selectFromGartenRevStddevFields()._depth.plz
