/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_avg_fieldsModel } from "./kultur_avg_fieldsModel"
import { kultur_avg_fieldsModelSelector } from "./kultur_avg_fieldsModel.base"
import { kultur_max_fieldsModel } from "./kultur_max_fieldsModel"
import { kultur_max_fieldsModelSelector } from "./kultur_max_fieldsModel.base"
import { kultur_min_fieldsModel } from "./kultur_min_fieldsModel"
import { kultur_min_fieldsModelSelector } from "./kultur_min_fieldsModel.base"
import { kultur_stddev_fieldsModel } from "./kultur_stddev_fieldsModel"
import { kultur_stddev_fieldsModelSelector } from "./kultur_stddev_fieldsModel.base"
import { kultur_stddev_pop_fieldsModel } from "./kultur_stddev_pop_fieldsModel"
import { kultur_stddev_pop_fieldsModelSelector } from "./kultur_stddev_pop_fieldsModel.base"
import { kultur_stddev_samp_fieldsModel } from "./kultur_stddev_samp_fieldsModel"
import { kultur_stddev_samp_fieldsModelSelector } from "./kultur_stddev_samp_fieldsModel.base"
import { kultur_sum_fieldsModel } from "./kultur_sum_fieldsModel"
import { kultur_sum_fieldsModelSelector } from "./kultur_sum_fieldsModel.base"
import { kultur_var_pop_fieldsModel } from "./kultur_var_pop_fieldsModel"
import { kultur_var_pop_fieldsModelSelector } from "./kultur_var_pop_fieldsModel.base"
import { kultur_var_samp_fieldsModel } from "./kultur_var_samp_fieldsModel"
import { kultur_var_samp_fieldsModelSelector } from "./kultur_var_samp_fieldsModel.base"
import { kultur_variance_fieldsModel } from "./kultur_variance_fieldsModel"
import { kultur_variance_fieldsModelSelector } from "./kultur_variance_fieldsModel.base"


/**
 * kultur_aggregate_fieldsBase
 * auto generated base class for the model kultur_aggregate_fieldsModel.
 *
 * aggregate fields of "kultur"
 */
export const kultur_aggregate_fieldsModelBase = ModelBase
  .named('kultur_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("kultur_aggregate_fields"), "kultur_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => kultur_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => kultur_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => kultur_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => kultur_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => kultur_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => kultur_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => kultur_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => kultur_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => kultur_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => kultur_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, kultur_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, kultur_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, kultur_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, kultur_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, kultur_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, kultur_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, kultur_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, kultur_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, kultur_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, kultur_variance_fieldsModelSelector, builder) }
}
export function selectFromkultur_aggregate_fields() {
  return new kultur_aggregate_fieldsModelSelector()
}

export const kultur_aggregate_fieldsModelPrimitives = selectFromkultur_aggregate_fields().count
