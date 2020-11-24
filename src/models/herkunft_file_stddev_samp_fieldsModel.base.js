/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_file_stddev_samp_fieldsBase
 * auto generated base class for the model herkunft_file_stddev_samp_fieldsModel.
 */
export const herkunft_file_stddev_samp_fieldsModelBase = ModelBase
  .named('herkunft_file_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_file_stddev_samp_fields"), "herkunft_file_stddev_samp_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_file_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromherkunft_file_stddev_samp_fields() {
  return new herkunft_file_stddev_samp_fieldsModelSelector()
}

export const herkunft_file_stddev_samp_fieldsModelPrimitives = selectFromherkunft_file_stddev_samp_fields()._rev_at
