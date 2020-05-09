/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungAvgFieldsBase
 * auto generated base class for the model ZaehlungAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const ZaehlungAvgFieldsModelBase = ModelBase
  .named('ZaehlungAvgFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_avg_fields"), "zaehlung_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungAvgFields() {
  return new ZaehlungAvgFieldsModelSelector()
}

export const zaehlungAvgFieldsModelPrimitives = selectFromZaehlungAvgFields()._depth
