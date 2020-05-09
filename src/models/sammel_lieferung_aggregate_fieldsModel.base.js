/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammel_lieferung_avg_fieldsModel } from "./sammel_lieferung_avg_fieldsModel"
import { sammel_lieferung_avg_fieldsModelSelector } from "./sammel_lieferung_avg_fieldsModel.base"
import { sammel_lieferung_max_fieldsModel } from "./sammel_lieferung_max_fieldsModel"
import { sammel_lieferung_max_fieldsModelSelector } from "./sammel_lieferung_max_fieldsModel.base"
import { sammel_lieferung_min_fieldsModel } from "./sammel_lieferung_min_fieldsModel"
import { sammel_lieferung_min_fieldsModelSelector } from "./sammel_lieferung_min_fieldsModel.base"
import { sammel_lieferung_stddev_fieldsModel } from "./sammel_lieferung_stddev_fieldsModel"
import { sammel_lieferung_stddev_fieldsModelSelector } from "./sammel_lieferung_stddev_fieldsModel.base"
import { sammel_lieferung_stddev_pop_fieldsModel } from "./sammel_lieferung_stddev_pop_fieldsModel"
import { sammel_lieferung_stddev_pop_fieldsModelSelector } from "./sammel_lieferung_stddev_pop_fieldsModel.base"
import { sammel_lieferung_stddev_samp_fieldsModel } from "./sammel_lieferung_stddev_samp_fieldsModel"
import { sammel_lieferung_stddev_samp_fieldsModelSelector } from "./sammel_lieferung_stddev_samp_fieldsModel.base"
import { sammel_lieferung_sum_fieldsModel } from "./sammel_lieferung_sum_fieldsModel"
import { sammel_lieferung_sum_fieldsModelSelector } from "./sammel_lieferung_sum_fieldsModel.base"
import { sammel_lieferung_var_pop_fieldsModel } from "./sammel_lieferung_var_pop_fieldsModel"
import { sammel_lieferung_var_pop_fieldsModelSelector } from "./sammel_lieferung_var_pop_fieldsModel.base"
import { sammel_lieferung_var_samp_fieldsModel } from "./sammel_lieferung_var_samp_fieldsModel"
import { sammel_lieferung_var_samp_fieldsModelSelector } from "./sammel_lieferung_var_samp_fieldsModel.base"
import { sammel_lieferung_variance_fieldsModel } from "./sammel_lieferung_variance_fieldsModel"
import { sammel_lieferung_variance_fieldsModelSelector } from "./sammel_lieferung_variance_fieldsModel.base"


/**
 * sammel_lieferung_aggregate_fieldsBase
 * auto generated base class for the model sammel_lieferung_aggregate_fieldsModel.
 *
 * aggregate fields of "sammel_lieferung"
 */
export const sammel_lieferung_aggregate_fieldsModelBase = ModelBase
  .named('sammel_lieferung_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_aggregate_fields"), "sammel_lieferung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammel_lieferung_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, sammel_lieferung_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, sammel_lieferung_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, sammel_lieferung_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, sammel_lieferung_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, sammel_lieferung_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, sammel_lieferung_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, sammel_lieferung_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, sammel_lieferung_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, sammel_lieferung_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, sammel_lieferung_variance_fieldsModelSelector, builder) }
}
export function selectFromsammel_lieferung_aggregate_fields() {
  return new sammel_lieferung_aggregate_fieldsModelSelector()
}

export const sammel_lieferung_aggregate_fieldsModelPrimitives = selectFromsammel_lieferung_aggregate_fields().count
