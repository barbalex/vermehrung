/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevAvgFieldsBase
 * auto generated base class for the model TeilkulturRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const TeilkulturRevAvgFieldsModelBase = ModelBase
  .named('TeilkulturRevAvgFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_avg_fields"), "teilkultur_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevAvgFields() {
  return new TeilkulturRevAvgFieldsModelSelector()
}

export const teilkulturRevAvgFieldsModelPrimitives = selectFromTeilkulturRevAvgFields()._depth
