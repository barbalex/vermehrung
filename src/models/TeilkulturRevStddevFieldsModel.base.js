/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevStddevFieldsBase
 * auto generated base class for the model TeilkulturRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const TeilkulturRevStddevFieldsModelBase = ModelBase
  .named('TeilkulturRevStddevFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_stddev_fields"), "teilkultur_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevStddevFields() {
  return new TeilkulturRevStddevFieldsModelSelector()
}

export const teilkulturRevStddevFieldsModelPrimitives = selectFromTeilkulturRevStddevFields()._depth
