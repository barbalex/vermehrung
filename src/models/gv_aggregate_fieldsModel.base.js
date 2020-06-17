/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gv_avg_fieldsModel } from "./gv_avg_fieldsModel"
import { gv_avg_fieldsModelSelector } from "./gv_avg_fieldsModel.base"
import { gv_max_fieldsModel } from "./gv_max_fieldsModel"
import { gv_max_fieldsModelSelector } from "./gv_max_fieldsModel.base"
import { gv_min_fieldsModel } from "./gv_min_fieldsModel"
import { gv_min_fieldsModelSelector } from "./gv_min_fieldsModel.base"
import { gv_stddev_fieldsModel } from "./gv_stddev_fieldsModel"
import { gv_stddev_fieldsModelSelector } from "./gv_stddev_fieldsModel.base"
import { gv_stddev_pop_fieldsModel } from "./gv_stddev_pop_fieldsModel"
import { gv_stddev_pop_fieldsModelSelector } from "./gv_stddev_pop_fieldsModel.base"
import { gv_stddev_samp_fieldsModel } from "./gv_stddev_samp_fieldsModel"
import { gv_stddev_samp_fieldsModelSelector } from "./gv_stddev_samp_fieldsModel.base"
import { gv_sum_fieldsModel } from "./gv_sum_fieldsModel"
import { gv_sum_fieldsModelSelector } from "./gv_sum_fieldsModel.base"
import { gv_var_pop_fieldsModel } from "./gv_var_pop_fieldsModel"
import { gv_var_pop_fieldsModelSelector } from "./gv_var_pop_fieldsModel.base"
import { gv_var_samp_fieldsModel } from "./gv_var_samp_fieldsModel"
import { gv_var_samp_fieldsModelSelector } from "./gv_var_samp_fieldsModel.base"
import { gv_variance_fieldsModel } from "./gv_variance_fieldsModel"
import { gv_variance_fieldsModelSelector } from "./gv_variance_fieldsModel.base"


/**
 * gv_aggregate_fieldsBase
 * auto generated base class for the model gv_aggregate_fieldsModel.
 */
export const gv_aggregate_fieldsModelBase = ModelBase
  .named('gv_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("gv_aggregate_fields"), "gv_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => gv_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => gv_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => gv_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => gv_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => gv_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => gv_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => gv_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => gv_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => gv_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => gv_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, gv_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, gv_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, gv_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, gv_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, gv_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, gv_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, gv_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, gv_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, gv_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, gv_variance_fieldsModelSelector, builder) }
}
export function selectFromgv_aggregate_fields() {
  return new gv_aggregate_fieldsModelSelector()
}

export const gv_aggregate_fieldsModelPrimitives = selectFromgv_aggregate_fields().count
