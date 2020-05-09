/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_avg_fieldsModel } from "./herkunft_avg_fieldsModel"
import { herkunft_avg_fieldsModelSelector } from "./herkunft_avg_fieldsModel.base"
import { herkunft_max_fieldsModel } from "./herkunft_max_fieldsModel"
import { herkunft_max_fieldsModelSelector } from "./herkunft_max_fieldsModel.base"
import { herkunft_min_fieldsModel } from "./herkunft_min_fieldsModel"
import { herkunft_min_fieldsModelSelector } from "./herkunft_min_fieldsModel.base"
import { herkunft_stddev_fieldsModel } from "./herkunft_stddev_fieldsModel"
import { herkunft_stddev_fieldsModelSelector } from "./herkunft_stddev_fieldsModel.base"
import { herkunft_stddev_pop_fieldsModel } from "./herkunft_stddev_pop_fieldsModel"
import { herkunft_stddev_pop_fieldsModelSelector } from "./herkunft_stddev_pop_fieldsModel.base"
import { herkunft_stddev_samp_fieldsModel } from "./herkunft_stddev_samp_fieldsModel"
import { herkunft_stddev_samp_fieldsModelSelector } from "./herkunft_stddev_samp_fieldsModel.base"
import { herkunft_sum_fieldsModel } from "./herkunft_sum_fieldsModel"
import { herkunft_sum_fieldsModelSelector } from "./herkunft_sum_fieldsModel.base"
import { herkunft_var_pop_fieldsModel } from "./herkunft_var_pop_fieldsModel"
import { herkunft_var_pop_fieldsModelSelector } from "./herkunft_var_pop_fieldsModel.base"
import { herkunft_var_samp_fieldsModel } from "./herkunft_var_samp_fieldsModel"
import { herkunft_var_samp_fieldsModelSelector } from "./herkunft_var_samp_fieldsModel.base"
import { herkunft_variance_fieldsModel } from "./herkunft_variance_fieldsModel"
import { herkunft_variance_fieldsModelSelector } from "./herkunft_variance_fieldsModel.base"


/**
 * herkunft_aggregate_fieldsBase
 * auto generated base class for the model herkunft_aggregate_fieldsModel.
 *
 * aggregate fields of "herkunft"
 */
export const herkunft_aggregate_fieldsModelBase = ModelBase
  .named('herkunft_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_aggregate_fields"), "herkunft_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => herkunft_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => herkunft_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => herkunft_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => herkunft_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => herkunft_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => herkunft_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => herkunft_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => herkunft_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => herkunft_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => herkunft_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, herkunft_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, herkunft_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, herkunft_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, herkunft_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, herkunft_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, herkunft_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, herkunft_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, herkunft_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, herkunft_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, herkunft_variance_fieldsModelSelector, builder) }
}
export function selectFromherkunft_aggregate_fields() {
  return new herkunft_aggregate_fieldsModelSelector()
}

export const herkunft_aggregate_fieldsModelPrimitives = selectFromherkunft_aggregate_fields().count
