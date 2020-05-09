/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilzaehlung_avg_fieldsModel } from "./teilzaehlung_avg_fieldsModel"
import { teilzaehlung_avg_fieldsModelSelector } from "./teilzaehlung_avg_fieldsModel.base"
import { teilzaehlung_max_fieldsModel } from "./teilzaehlung_max_fieldsModel"
import { teilzaehlung_max_fieldsModelSelector } from "./teilzaehlung_max_fieldsModel.base"
import { teilzaehlung_min_fieldsModel } from "./teilzaehlung_min_fieldsModel"
import { teilzaehlung_min_fieldsModelSelector } from "./teilzaehlung_min_fieldsModel.base"
import { teilzaehlung_stddev_fieldsModel } from "./teilzaehlung_stddev_fieldsModel"
import { teilzaehlung_stddev_fieldsModelSelector } from "./teilzaehlung_stddev_fieldsModel.base"
import { teilzaehlung_stddev_pop_fieldsModel } from "./teilzaehlung_stddev_pop_fieldsModel"
import { teilzaehlung_stddev_pop_fieldsModelSelector } from "./teilzaehlung_stddev_pop_fieldsModel.base"
import { teilzaehlung_stddev_samp_fieldsModel } from "./teilzaehlung_stddev_samp_fieldsModel"
import { teilzaehlung_stddev_samp_fieldsModelSelector } from "./teilzaehlung_stddev_samp_fieldsModel.base"
import { teilzaehlung_sum_fieldsModel } from "./teilzaehlung_sum_fieldsModel"
import { teilzaehlung_sum_fieldsModelSelector } from "./teilzaehlung_sum_fieldsModel.base"
import { teilzaehlung_var_pop_fieldsModel } from "./teilzaehlung_var_pop_fieldsModel"
import { teilzaehlung_var_pop_fieldsModelSelector } from "./teilzaehlung_var_pop_fieldsModel.base"
import { teilzaehlung_var_samp_fieldsModel } from "./teilzaehlung_var_samp_fieldsModel"
import { teilzaehlung_var_samp_fieldsModelSelector } from "./teilzaehlung_var_samp_fieldsModel.base"
import { teilzaehlung_variance_fieldsModel } from "./teilzaehlung_variance_fieldsModel"
import { teilzaehlung_variance_fieldsModelSelector } from "./teilzaehlung_variance_fieldsModel.base"


/**
 * teilzaehlung_aggregate_fieldsBase
 * auto generated base class for the model teilzaehlung_aggregate_fieldsModel.
 *
 * aggregate fields of "teilzaehlung"
 */
export const teilzaehlung_aggregate_fieldsModelBase = ModelBase
  .named('teilzaehlung_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_aggregate_fields"), "teilzaehlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => teilzaehlung_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => teilzaehlung_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => teilzaehlung_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => teilzaehlung_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => teilzaehlung_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => teilzaehlung_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => teilzaehlung_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => teilzaehlung_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => teilzaehlung_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => teilzaehlung_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, teilzaehlung_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, teilzaehlung_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, teilzaehlung_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, teilzaehlung_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, teilzaehlung_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, teilzaehlung_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, teilzaehlung_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, teilzaehlung_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, teilzaehlung_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, teilzaehlung_variance_fieldsModelSelector, builder) }
}
export function selectFromteilzaehlung_aggregate_fields() {
  return new teilzaehlung_aggregate_fieldsModelSelector()
}

export const teilzaehlung_aggregate_fieldsModelPrimitives = selectFromteilzaehlung_aggregate_fields().count
