/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_stddev_samp_fieldsBase
 * auto generated base class for the model gv_stddev_samp_fieldsModel.
 */
export const gv_stddev_samp_fieldsModelBase = ModelBase
  .named('gv_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("gv_stddev_samp_fields"), "gv_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromgv_stddev_samp_fields() {
  return new gv_stddev_samp_fieldsModelSelector()
}

export const gv_stddev_samp_fieldsModelPrimitives = selectFromgv_stddev_samp_fields()._depth
