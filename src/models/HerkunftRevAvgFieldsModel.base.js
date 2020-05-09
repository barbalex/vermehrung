/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevAvgFieldsBase
 * auto generated base class for the model HerkunftRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const HerkunftRevAvgFieldsModelBase = ModelBase
  .named('HerkunftRevAvgFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_avg_fields"), "herkunft_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevAvgFields() {
  return new HerkunftRevAvgFieldsModelSelector()
}

export const herkunftRevAvgFieldsModelPrimitives = selectFromHerkunftRevAvgFields()._depth
