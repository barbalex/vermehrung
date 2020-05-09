/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevStddevSampFieldsBase
 * auto generated base class for the model HerkunftRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const HerkunftRevStddevSampFieldsModelBase = ModelBase
  .named('HerkunftRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_stddev_samp_fields"), "herkunft_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevStddevSampFields() {
  return new HerkunftRevStddevSampFieldsModelSelector()
}

export const herkunftRevStddevSampFieldsModelPrimitives = selectFromHerkunftRevStddevSampFields()._depth
