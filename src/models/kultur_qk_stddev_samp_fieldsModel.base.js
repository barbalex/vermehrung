/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_qk_stddev_samp_fieldsBase
 * auto generated base class for the model kultur_qk_stddev_samp_fieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const kultur_qk_stddev_samp_fieldsModelBase = ModelBase
  .named('kultur_qk_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_stddev_samp_fields"), "kultur_qk_stddev_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromkultur_qk_stddev_samp_fields() {
  return new kultur_qk_stddev_samp_fieldsModelSelector()
}

export const kultur_qk_stddev_samp_fieldsModelPrimitives = selectFromkultur_qk_stddev_samp_fields().sort
