/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevVarianceFieldsBase
 * auto generated base class for the model ZaehlungRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const ZaehlungRevVarianceFieldsModelBase = ModelBase
  .named('ZaehlungRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_variance_fields"), "zaehlung_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevVarianceFields() {
  return new ZaehlungRevVarianceFieldsModelSelector()
}

export const zaehlungRevVarianceFieldsModelPrimitives = selectFromZaehlungRevVarianceFields()._depth
