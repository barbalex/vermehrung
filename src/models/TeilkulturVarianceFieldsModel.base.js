/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturVarianceFieldsBase
 * auto generated base class for the model TeilkulturVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const TeilkulturVarianceFieldsModelBase = ModelBase
  .named('TeilkulturVarianceFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_variance_fields"), "teilkultur_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturVarianceFields() {
  return new TeilkulturVarianceFieldsModelSelector()
}

export const teilkulturVarianceFieldsModelPrimitives = selectFromTeilkulturVarianceFields()._depth
