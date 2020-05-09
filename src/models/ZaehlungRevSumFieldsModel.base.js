/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevSumFieldsBase
 * auto generated base class for the model ZaehlungRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const ZaehlungRevSumFieldsModelBase = ModelBase
  .named('ZaehlungRevSumFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_sum_fields"), "zaehlung_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevSumFields() {
  return new ZaehlungRevSumFieldsModelSelector()
}

export const zaehlungRevSumFieldsModelPrimitives = selectFromZaehlungRevSumFields()._depth
