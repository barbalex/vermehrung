/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevVarianceFieldsBase
 * auto generated base class for the model TeilkulturRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const TeilkulturRevVarianceFieldsModelBase = ModelBase
  .named('TeilkulturRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_variance_fields"), "teilkultur_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevVarianceFields() {
  return new TeilkulturRevVarianceFieldsModelSelector()
}

export const teilkulturRevVarianceFieldsModelPrimitives = selectFromTeilkulturRevVarianceFields()._depth
