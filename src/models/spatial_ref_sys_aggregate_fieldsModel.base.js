/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { spatial_ref_sys_avg_fieldsModel } from "./spatial_ref_sys_avg_fieldsModel"
import { spatial_ref_sys_avg_fieldsModelSelector } from "./spatial_ref_sys_avg_fieldsModel.base"
import { spatial_ref_sys_max_fieldsModel } from "./spatial_ref_sys_max_fieldsModel"
import { spatial_ref_sys_max_fieldsModelSelector } from "./spatial_ref_sys_max_fieldsModel.base"
import { spatial_ref_sys_min_fieldsModel } from "./spatial_ref_sys_min_fieldsModel"
import { spatial_ref_sys_min_fieldsModelSelector } from "./spatial_ref_sys_min_fieldsModel.base"
import { spatial_ref_sys_stddev_fieldsModel } from "./spatial_ref_sys_stddev_fieldsModel"
import { spatial_ref_sys_stddev_fieldsModelSelector } from "./spatial_ref_sys_stddev_fieldsModel.base"
import { spatial_ref_sys_stddev_pop_fieldsModel } from "./spatial_ref_sys_stddev_pop_fieldsModel"
import { spatial_ref_sys_stddev_pop_fieldsModelSelector } from "./spatial_ref_sys_stddev_pop_fieldsModel.base"
import { spatial_ref_sys_stddev_samp_fieldsModel } from "./spatial_ref_sys_stddev_samp_fieldsModel"
import { spatial_ref_sys_stddev_samp_fieldsModelSelector } from "./spatial_ref_sys_stddev_samp_fieldsModel.base"
import { spatial_ref_sys_sum_fieldsModel } from "./spatial_ref_sys_sum_fieldsModel"
import { spatial_ref_sys_sum_fieldsModelSelector } from "./spatial_ref_sys_sum_fieldsModel.base"
import { spatial_ref_sys_var_pop_fieldsModel } from "./spatial_ref_sys_var_pop_fieldsModel"
import { spatial_ref_sys_var_pop_fieldsModelSelector } from "./spatial_ref_sys_var_pop_fieldsModel.base"
import { spatial_ref_sys_var_samp_fieldsModel } from "./spatial_ref_sys_var_samp_fieldsModel"
import { spatial_ref_sys_var_samp_fieldsModelSelector } from "./spatial_ref_sys_var_samp_fieldsModel.base"
import { spatial_ref_sys_variance_fieldsModel } from "./spatial_ref_sys_variance_fieldsModel"
import { spatial_ref_sys_variance_fieldsModelSelector } from "./spatial_ref_sys_variance_fieldsModel.base"


/**
 * spatial_ref_sys_aggregate_fieldsBase
 * auto generated base class for the model spatial_ref_sys_aggregate_fieldsModel.
 */
export const spatial_ref_sys_aggregate_fieldsModelBase = ModelBase
  .named('spatial_ref_sys_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_aggregate_fields"), "spatial_ref_sys_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class spatial_ref_sys_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, spatial_ref_sys_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, spatial_ref_sys_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, spatial_ref_sys_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, spatial_ref_sys_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, spatial_ref_sys_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, spatial_ref_sys_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, spatial_ref_sys_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, spatial_ref_sys_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, spatial_ref_sys_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, spatial_ref_sys_variance_fieldsModelSelector, builder) }
}
export function selectFromspatial_ref_sys_aggregate_fields() {
  return new spatial_ref_sys_aggregate_fieldsModelSelector()
}

export const spatial_ref_sys_aggregate_fieldsModelPrimitives = selectFromspatial_ref_sys_aggregate_fields().count
