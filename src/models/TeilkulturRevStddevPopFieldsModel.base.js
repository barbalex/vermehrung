/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevStddevPopFieldsBase
 * auto generated base class for the model TeilkulturRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const TeilkulturRevStddevPopFieldsModelBase = ModelBase
  .named('TeilkulturRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_stddev_pop_fields"), "teilkultur_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevStddevPopFields() {
  return new TeilkulturRevStddevPopFieldsModelSelector()
}

export const teilkulturRevStddevPopFieldsModelPrimitives = selectFromTeilkulturRevStddevPopFields()._depth
