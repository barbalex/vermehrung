/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_avg_fieldsModel } from "./sammlung_avg_fieldsModel"
import { sammlung_avg_fieldsModelSelector } from "./sammlung_avg_fieldsModel.base"
import { sammlung_max_fieldsModel } from "./sammlung_max_fieldsModel"
import { sammlung_max_fieldsModelSelector } from "./sammlung_max_fieldsModel.base"
import { sammlung_min_fieldsModel } from "./sammlung_min_fieldsModel"
import { sammlung_min_fieldsModelSelector } from "./sammlung_min_fieldsModel.base"
import { sammlung_stddev_fieldsModel } from "./sammlung_stddev_fieldsModel"
import { sammlung_stddev_fieldsModelSelector } from "./sammlung_stddev_fieldsModel.base"
import { sammlung_stddev_pop_fieldsModel } from "./sammlung_stddev_pop_fieldsModel"
import { sammlung_stddev_pop_fieldsModelSelector } from "./sammlung_stddev_pop_fieldsModel.base"
import { sammlung_stddev_samp_fieldsModel } from "./sammlung_stddev_samp_fieldsModel"
import { sammlung_stddev_samp_fieldsModelSelector } from "./sammlung_stddev_samp_fieldsModel.base"
import { sammlung_sum_fieldsModel } from "./sammlung_sum_fieldsModel"
import { sammlung_sum_fieldsModelSelector } from "./sammlung_sum_fieldsModel.base"
import { sammlung_var_pop_fieldsModel } from "./sammlung_var_pop_fieldsModel"
import { sammlung_var_pop_fieldsModelSelector } from "./sammlung_var_pop_fieldsModel.base"
import { sammlung_var_samp_fieldsModel } from "./sammlung_var_samp_fieldsModel"
import { sammlung_var_samp_fieldsModelSelector } from "./sammlung_var_samp_fieldsModel.base"
import { sammlung_variance_fieldsModel } from "./sammlung_variance_fieldsModel"
import { sammlung_variance_fieldsModelSelector } from "./sammlung_variance_fieldsModel.base"


/**
 * sammlung_aggregate_fieldsBase
 * auto generated base class for the model sammlung_aggregate_fieldsModel.
 */
export const sammlung_aggregate_fieldsModelBase = ModelBase
  .named('sammlung_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_aggregate_fields"), "sammlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => sammlung_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => sammlung_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => sammlung_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => sammlung_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => sammlung_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => sammlung_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => sammlung_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => sammlung_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => sammlung_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => sammlung_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, sammlung_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, sammlung_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, sammlung_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, sammlung_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, sammlung_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, sammlung_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, sammlung_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, sammlung_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, sammlung_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, sammlung_variance_fieldsModelSelector, builder) }
}
export function selectFromsammlung_aggregate_fields() {
  return new sammlung_aggregate_fieldsModelSelector()
}

export const sammlung_aggregate_fieldsModelPrimitives = selectFromsammlung_aggregate_fields().count
