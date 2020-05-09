/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturStddevPopFieldsBase
 * auto generated base class for the model TeilkulturStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const TeilkulturStddevPopFieldsModelBase = ModelBase
  .named('TeilkulturStddevPopFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_stddev_pop_fields"), "teilkultur_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturStddevPopFields() {
  return new TeilkulturStddevPopFieldsModelSelector()
}

export const teilkulturStddevPopFieldsModelPrimitives = selectFromTeilkulturStddevPopFields()._depth
