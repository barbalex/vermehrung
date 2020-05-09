/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevStddevFieldsBase
 * auto generated base class for the model HerkunftRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const HerkunftRevStddevFieldsModelBase = ModelBase
  .named('HerkunftRevStddevFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_stddev_fields"), "herkunft_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevStddevFields() {
  return new HerkunftRevStddevFieldsModelSelector()
}

export const herkunftRevStddevFieldsModelPrimitives = selectFromHerkunftRevStddevFields()._depth
