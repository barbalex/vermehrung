/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungSumFieldsBase
 * auto generated base class for the model ZaehlungSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const ZaehlungSumFieldsModelBase = ModelBase
  .named('ZaehlungSumFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_sum_fields"), "zaehlung_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungSumFields() {
  return new ZaehlungSumFieldsModelSelector()
}

export const zaehlungSumFieldsModelPrimitives = selectFromZaehlungSumFields()._depth
