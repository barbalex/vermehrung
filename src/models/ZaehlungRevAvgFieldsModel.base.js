/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevAvgFieldsBase
 * auto generated base class for the model ZaehlungRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const ZaehlungRevAvgFieldsModelBase = ModelBase
  .named('ZaehlungRevAvgFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_avg_fields"), "zaehlung_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevAvgFields() {
  return new ZaehlungRevAvgFieldsModelSelector()
}

export const zaehlungRevAvgFieldsModelPrimitives = selectFromZaehlungRevAvgFields()._depth
