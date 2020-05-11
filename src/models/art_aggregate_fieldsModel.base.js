/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_avg_fieldsModel } from "./art_avg_fieldsModel"
import { art_avg_fieldsModelSelector } from "./art_avg_fieldsModel.base"
import { art_max_fieldsModel } from "./art_max_fieldsModel"
import { art_max_fieldsModelSelector } from "./art_max_fieldsModel.base"
import { art_min_fieldsModel } from "./art_min_fieldsModel"
import { art_min_fieldsModelSelector } from "./art_min_fieldsModel.base"
import { art_stddev_fieldsModel } from "./art_stddev_fieldsModel"
import { art_stddev_fieldsModelSelector } from "./art_stddev_fieldsModel.base"
import { art_stddev_pop_fieldsModel } from "./art_stddev_pop_fieldsModel"
import { art_stddev_pop_fieldsModelSelector } from "./art_stddev_pop_fieldsModel.base"
import { art_stddev_samp_fieldsModel } from "./art_stddev_samp_fieldsModel"
import { art_stddev_samp_fieldsModelSelector } from "./art_stddev_samp_fieldsModel.base"
import { art_sum_fieldsModel } from "./art_sum_fieldsModel"
import { art_sum_fieldsModelSelector } from "./art_sum_fieldsModel.base"
import { art_var_pop_fieldsModel } from "./art_var_pop_fieldsModel"
import { art_var_pop_fieldsModelSelector } from "./art_var_pop_fieldsModel.base"
import { art_var_samp_fieldsModel } from "./art_var_samp_fieldsModel"
import { art_var_samp_fieldsModelSelector } from "./art_var_samp_fieldsModel.base"
import { art_variance_fieldsModel } from "./art_variance_fieldsModel"
import { art_variance_fieldsModelSelector } from "./art_variance_fieldsModel.base"


/**
 * art_aggregate_fieldsBase
 * auto generated base class for the model art_aggregate_fieldsModel.
 *
 * aggregate fields of "art"
 */
export const art_aggregate_fieldsModelBase = ModelBase
  .named('art_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("art_aggregate_fields"), "art_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => art_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => art_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => art_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => art_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => art_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => art_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => art_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => art_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => art_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => art_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, art_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, art_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, art_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, art_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, art_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, art_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, art_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, art_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, art_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, art_variance_fieldsModelSelector, builder) }
}
export function selectFromart_aggregate_fields() {
  return new art_aggregate_fieldsModelSelector()
}

export const art_aggregate_fieldsModelPrimitives = selectFromart_aggregate_fields().count
