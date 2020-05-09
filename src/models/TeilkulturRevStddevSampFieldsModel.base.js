/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevStddevSampFieldsBase
 * auto generated base class for the model TeilkulturRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const TeilkulturRevStddevSampFieldsModelBase = ModelBase
  .named('TeilkulturRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_stddev_samp_fields"), "teilkultur_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevStddevSampFields() {
  return new TeilkulturRevStddevSampFieldsModelSelector()
}

export const teilkulturRevStddevSampFieldsModelPrimitives = selectFromTeilkulturRevStddevSampFields()._depth
