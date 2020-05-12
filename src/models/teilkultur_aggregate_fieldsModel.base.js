/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkultur_avg_fieldsModel } from "./teilkultur_avg_fieldsModel"
import { teilkultur_avg_fieldsModelSelector } from "./teilkultur_avg_fieldsModel.base"
import { teilkultur_max_fieldsModel } from "./teilkultur_max_fieldsModel"
import { teilkultur_max_fieldsModelSelector } from "./teilkultur_max_fieldsModel.base"
import { teilkultur_min_fieldsModel } from "./teilkultur_min_fieldsModel"
import { teilkultur_min_fieldsModelSelector } from "./teilkultur_min_fieldsModel.base"
import { teilkultur_stddev_fieldsModel } from "./teilkultur_stddev_fieldsModel"
import { teilkultur_stddev_fieldsModelSelector } from "./teilkultur_stddev_fieldsModel.base"
import { teilkultur_stddev_pop_fieldsModel } from "./teilkultur_stddev_pop_fieldsModel"
import { teilkultur_stddev_pop_fieldsModelSelector } from "./teilkultur_stddev_pop_fieldsModel.base"
import { teilkultur_stddev_samp_fieldsModel } from "./teilkultur_stddev_samp_fieldsModel"
import { teilkultur_stddev_samp_fieldsModelSelector } from "./teilkultur_stddev_samp_fieldsModel.base"
import { teilkultur_sum_fieldsModel } from "./teilkultur_sum_fieldsModel"
import { teilkultur_sum_fieldsModelSelector } from "./teilkultur_sum_fieldsModel.base"
import { teilkultur_var_pop_fieldsModel } from "./teilkultur_var_pop_fieldsModel"
import { teilkultur_var_pop_fieldsModelSelector } from "./teilkultur_var_pop_fieldsModel.base"
import { teilkultur_var_samp_fieldsModel } from "./teilkultur_var_samp_fieldsModel"
import { teilkultur_var_samp_fieldsModelSelector } from "./teilkultur_var_samp_fieldsModel.base"
import { teilkultur_variance_fieldsModel } from "./teilkultur_variance_fieldsModel"
import { teilkultur_variance_fieldsModelSelector } from "./teilkultur_variance_fieldsModel.base"


/**
 * teilkultur_aggregate_fieldsBase
 * auto generated base class for the model teilkultur_aggregate_fieldsModel.
 */
export const teilkultur_aggregate_fieldsModelBase = ModelBase
  .named('teilkultur_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_aggregate_fields"), "teilkultur_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => teilkultur_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => teilkultur_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => teilkultur_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => teilkultur_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => teilkultur_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => teilkultur_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => teilkultur_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => teilkultur_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => teilkultur_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => teilkultur_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, teilkultur_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, teilkultur_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, teilkultur_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, teilkultur_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, teilkultur_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, teilkultur_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, teilkultur_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, teilkultur_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, teilkultur_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, teilkultur_variance_fieldsModelSelector, builder) }
}
export function selectFromteilkultur_aggregate_fields() {
  return new teilkultur_aggregate_fieldsModelSelector()
}

export const teilkultur_aggregate_fieldsModelPrimitives = selectFromteilkultur_aggregate_fields().count
