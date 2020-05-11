/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_avg_fieldsModel } from "./garten_avg_fieldsModel"
import { garten_avg_fieldsModelSelector } from "./garten_avg_fieldsModel.base"
import { garten_max_fieldsModel } from "./garten_max_fieldsModel"
import { garten_max_fieldsModelSelector } from "./garten_max_fieldsModel.base"
import { garten_min_fieldsModel } from "./garten_min_fieldsModel"
import { garten_min_fieldsModelSelector } from "./garten_min_fieldsModel.base"
import { garten_stddev_fieldsModel } from "./garten_stddev_fieldsModel"
import { garten_stddev_fieldsModelSelector } from "./garten_stddev_fieldsModel.base"
import { garten_stddev_pop_fieldsModel } from "./garten_stddev_pop_fieldsModel"
import { garten_stddev_pop_fieldsModelSelector } from "./garten_stddev_pop_fieldsModel.base"
import { garten_stddev_samp_fieldsModel } from "./garten_stddev_samp_fieldsModel"
import { garten_stddev_samp_fieldsModelSelector } from "./garten_stddev_samp_fieldsModel.base"
import { garten_sum_fieldsModel } from "./garten_sum_fieldsModel"
import { garten_sum_fieldsModelSelector } from "./garten_sum_fieldsModel.base"
import { garten_var_pop_fieldsModel } from "./garten_var_pop_fieldsModel"
import { garten_var_pop_fieldsModelSelector } from "./garten_var_pop_fieldsModel.base"
import { garten_var_samp_fieldsModel } from "./garten_var_samp_fieldsModel"
import { garten_var_samp_fieldsModelSelector } from "./garten_var_samp_fieldsModel.base"
import { garten_variance_fieldsModel } from "./garten_variance_fieldsModel"
import { garten_variance_fieldsModelSelector } from "./garten_variance_fieldsModel.base"


/**
 * garten_aggregate_fieldsBase
 * auto generated base class for the model garten_aggregate_fieldsModel.
 *
 * aggregate fields of "garten"
 */
export const garten_aggregate_fieldsModelBase = ModelBase
  .named('garten_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("garten_aggregate_fields"), "garten_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => garten_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => garten_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => garten_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => garten_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => garten_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => garten_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => garten_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => garten_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => garten_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => garten_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, garten_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, garten_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, garten_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, garten_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, garten_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, garten_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, garten_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, garten_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, garten_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, garten_variance_fieldsModelSelector, builder) }
}
export function selectFromgarten_aggregate_fields() {
  return new garten_aggregate_fieldsModelSelector()
}

export const garten_aggregate_fieldsModelPrimitives = selectFromgarten_aggregate_fields().count
