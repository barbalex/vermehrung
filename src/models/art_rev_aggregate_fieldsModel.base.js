/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_rev_avg_fieldsModel } from "./art_rev_avg_fieldsModel"
import { art_rev_avg_fieldsModelSelector } from "./art_rev_avg_fieldsModel.base"
import { art_rev_max_fieldsModel } from "./art_rev_max_fieldsModel"
import { art_rev_max_fieldsModelSelector } from "./art_rev_max_fieldsModel.base"
import { art_rev_min_fieldsModel } from "./art_rev_min_fieldsModel"
import { art_rev_min_fieldsModelSelector } from "./art_rev_min_fieldsModel.base"
import { art_rev_stddev_fieldsModel } from "./art_rev_stddev_fieldsModel"
import { art_rev_stddev_fieldsModelSelector } from "./art_rev_stddev_fieldsModel.base"
import { art_rev_stddev_pop_fieldsModel } from "./art_rev_stddev_pop_fieldsModel"
import { art_rev_stddev_pop_fieldsModelSelector } from "./art_rev_stddev_pop_fieldsModel.base"
import { art_rev_stddev_samp_fieldsModel } from "./art_rev_stddev_samp_fieldsModel"
import { art_rev_stddev_samp_fieldsModelSelector } from "./art_rev_stddev_samp_fieldsModel.base"
import { art_rev_sum_fieldsModel } from "./art_rev_sum_fieldsModel"
import { art_rev_sum_fieldsModelSelector } from "./art_rev_sum_fieldsModel.base"
import { art_rev_var_pop_fieldsModel } from "./art_rev_var_pop_fieldsModel"
import { art_rev_var_pop_fieldsModelSelector } from "./art_rev_var_pop_fieldsModel.base"
import { art_rev_var_samp_fieldsModel } from "./art_rev_var_samp_fieldsModel"
import { art_rev_var_samp_fieldsModelSelector } from "./art_rev_var_samp_fieldsModel.base"
import { art_rev_variance_fieldsModel } from "./art_rev_variance_fieldsModel"
import { art_rev_variance_fieldsModelSelector } from "./art_rev_variance_fieldsModel.base"


/**
 * art_rev_aggregate_fieldsBase
 * auto generated base class for the model art_rev_aggregate_fieldsModel.
 *
 * aggregate fields of "art_rev"
 */
export const art_rev_aggregate_fieldsModelBase = ModelBase
  .named('art_rev_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("art_rev_aggregate_fields"), "art_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => art_rev_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => art_rev_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => art_rev_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => art_rev_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => art_rev_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => art_rev_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => art_rev_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => art_rev_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => art_rev_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => art_rev_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_rev_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, art_rev_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, art_rev_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, art_rev_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, art_rev_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, art_rev_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, art_rev_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, art_rev_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, art_rev_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, art_rev_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, art_rev_variance_fieldsModelSelector, builder) }
}
export function selectFromart_rev_aggregate_fields() {
  return new art_rev_aggregate_fieldsModelSelector()
}

export const art_rev_aggregate_fieldsModelPrimitives = selectFromart_rev_aggregate_fields().count
