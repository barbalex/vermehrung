/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { zaehlung_avg_fieldsModel } from "./zaehlung_avg_fieldsModel"
import { zaehlung_avg_fieldsModelSelector } from "./zaehlung_avg_fieldsModel.base"
import { zaehlung_max_fieldsModel } from "./zaehlung_max_fieldsModel"
import { zaehlung_max_fieldsModelSelector } from "./zaehlung_max_fieldsModel.base"
import { zaehlung_min_fieldsModel } from "./zaehlung_min_fieldsModel"
import { zaehlung_min_fieldsModelSelector } from "./zaehlung_min_fieldsModel.base"
import { zaehlung_stddev_fieldsModel } from "./zaehlung_stddev_fieldsModel"
import { zaehlung_stddev_fieldsModelSelector } from "./zaehlung_stddev_fieldsModel.base"
import { zaehlung_stddev_pop_fieldsModel } from "./zaehlung_stddev_pop_fieldsModel"
import { zaehlung_stddev_pop_fieldsModelSelector } from "./zaehlung_stddev_pop_fieldsModel.base"
import { zaehlung_stddev_samp_fieldsModel } from "./zaehlung_stddev_samp_fieldsModel"
import { zaehlung_stddev_samp_fieldsModelSelector } from "./zaehlung_stddev_samp_fieldsModel.base"
import { zaehlung_sum_fieldsModel } from "./zaehlung_sum_fieldsModel"
import { zaehlung_sum_fieldsModelSelector } from "./zaehlung_sum_fieldsModel.base"
import { zaehlung_var_pop_fieldsModel } from "./zaehlung_var_pop_fieldsModel"
import { zaehlung_var_pop_fieldsModelSelector } from "./zaehlung_var_pop_fieldsModel.base"
import { zaehlung_var_samp_fieldsModel } from "./zaehlung_var_samp_fieldsModel"
import { zaehlung_var_samp_fieldsModelSelector } from "./zaehlung_var_samp_fieldsModel.base"
import { zaehlung_variance_fieldsModel } from "./zaehlung_variance_fieldsModel"
import { zaehlung_variance_fieldsModelSelector } from "./zaehlung_variance_fieldsModel.base"


/**
 * zaehlung_aggregate_fieldsBase
 * auto generated base class for the model zaehlung_aggregate_fieldsModel.
 *
 * aggregate fields of "zaehlung"
 */
export const zaehlung_aggregate_fieldsModelBase = ModelBase
  .named('zaehlung_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("zaehlung_aggregate_fields"), "zaehlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => zaehlung_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => zaehlung_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => zaehlung_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => zaehlung_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => zaehlung_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => zaehlung_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => zaehlung_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => zaehlung_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => zaehlung_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => zaehlung_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, zaehlung_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, zaehlung_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, zaehlung_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, zaehlung_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, zaehlung_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, zaehlung_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, zaehlung_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, zaehlung_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, zaehlung_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, zaehlung_variance_fieldsModelSelector, builder) }
}
export function selectFromzaehlung_aggregate_fields() {
  return new zaehlung_aggregate_fieldsModelSelector()
}

export const zaehlung_aggregate_fieldsModelPrimitives = selectFromzaehlung_aggregate_fields().count
