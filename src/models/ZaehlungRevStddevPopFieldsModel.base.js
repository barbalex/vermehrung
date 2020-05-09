/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevStddevPopFieldsBase
 * auto generated base class for the model ZaehlungRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const ZaehlungRevStddevPopFieldsModelBase = ModelBase
  .named('ZaehlungRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_stddev_pop_fields"), "zaehlung_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevStddevPopFields() {
  return new ZaehlungRevStddevPopFieldsModelSelector()
}

export const zaehlungRevStddevPopFieldsModelPrimitives = selectFromZaehlungRevStddevPopFields()._depth
