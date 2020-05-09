/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungStddevPopFieldsBase
 * auto generated base class for the model ZaehlungStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const ZaehlungStddevPopFieldsModelBase = ModelBase
  .named('ZaehlungStddevPopFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_stddev_pop_fields"), "zaehlung_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungStddevPopFields() {
  return new ZaehlungStddevPopFieldsModelSelector()
}

export const zaehlungStddevPopFieldsModelPrimitives = selectFromZaehlungStddevPopFields()._depth
