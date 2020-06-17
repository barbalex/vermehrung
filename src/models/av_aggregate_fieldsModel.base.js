/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_avg_fieldsModel } from "./av_avg_fieldsModel"
import { av_avg_fieldsModelSelector } from "./av_avg_fieldsModel.base"
import { av_max_fieldsModel } from "./av_max_fieldsModel"
import { av_max_fieldsModelSelector } from "./av_max_fieldsModel.base"
import { av_min_fieldsModel } from "./av_min_fieldsModel"
import { av_min_fieldsModelSelector } from "./av_min_fieldsModel.base"
import { av_stddev_fieldsModel } from "./av_stddev_fieldsModel"
import { av_stddev_fieldsModelSelector } from "./av_stddev_fieldsModel.base"
import { av_stddev_pop_fieldsModel } from "./av_stddev_pop_fieldsModel"
import { av_stddev_pop_fieldsModelSelector } from "./av_stddev_pop_fieldsModel.base"
import { av_stddev_samp_fieldsModel } from "./av_stddev_samp_fieldsModel"
import { av_stddev_samp_fieldsModelSelector } from "./av_stddev_samp_fieldsModel.base"
import { av_sum_fieldsModel } from "./av_sum_fieldsModel"
import { av_sum_fieldsModelSelector } from "./av_sum_fieldsModel.base"
import { av_var_pop_fieldsModel } from "./av_var_pop_fieldsModel"
import { av_var_pop_fieldsModelSelector } from "./av_var_pop_fieldsModel.base"
import { av_var_samp_fieldsModel } from "./av_var_samp_fieldsModel"
import { av_var_samp_fieldsModelSelector } from "./av_var_samp_fieldsModel.base"
import { av_variance_fieldsModel } from "./av_variance_fieldsModel"
import { av_variance_fieldsModelSelector } from "./av_variance_fieldsModel.base"


/**
 * av_aggregate_fieldsBase
 * auto generated base class for the model av_aggregate_fieldsModel.
 */
export const av_aggregate_fieldsModelBase = ModelBase
  .named('av_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("av_aggregate_fields"), "av_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => av_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => av_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => av_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => av_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => av_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => av_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => av_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => av_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => av_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => av_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, av_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, av_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, av_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, av_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, av_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, av_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, av_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, av_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, av_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, av_variance_fieldsModelSelector, builder) }
}
export function selectFromav_aggregate_fields() {
  return new av_aggregate_fieldsModelSelector()
}

export const av_aggregate_fieldsModelPrimitives = selectFromav_aggregate_fields().count
