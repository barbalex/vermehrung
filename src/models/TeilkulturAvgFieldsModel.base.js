/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturAvgFieldsBase
 * auto generated base class for the model TeilkulturAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const TeilkulturAvgFieldsModelBase = ModelBase
  .named('TeilkulturAvgFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_avg_fields"), "teilkultur_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturAvgFields() {
  return new TeilkulturAvgFieldsModelSelector()
}

export const teilkulturAvgFieldsModelPrimitives = selectFromTeilkulturAvgFields()._depth
