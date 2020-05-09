/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungVarianceFieldsBase
 * auto generated base class for the model ZaehlungVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const ZaehlungVarianceFieldsModelBase = ModelBase
  .named('ZaehlungVarianceFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_variance_fields"), "zaehlung_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungVarianceFields() {
  return new ZaehlungVarianceFieldsModelSelector()
}

export const zaehlungVarianceFieldsModelPrimitives = selectFromZaehlungVarianceFields()._depth
