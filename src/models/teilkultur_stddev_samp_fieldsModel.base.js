/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_stddev_samp_fieldsBase
 * auto generated base class for the model teilkultur_stddev_samp_fieldsModel.
 */
export const teilkultur_stddev_samp_fieldsModelBase = ModelBase
  .named('teilkultur_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_stddev_samp_fields"), "teilkultur_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromteilkultur_stddev_samp_fields() {
  return new teilkultur_stddev_samp_fieldsModelSelector()
}

export const teilkultur_stddev_samp_fieldsModelPrimitives = selectFromteilkultur_stddev_samp_fields()._depth
