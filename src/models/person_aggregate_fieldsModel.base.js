/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_avg_fieldsModel } from "./person_avg_fieldsModel"
import { person_avg_fieldsModelSelector } from "./person_avg_fieldsModel.base"
import { person_max_fieldsModel } from "./person_max_fieldsModel"
import { person_max_fieldsModelSelector } from "./person_max_fieldsModel.base"
import { person_min_fieldsModel } from "./person_min_fieldsModel"
import { person_min_fieldsModelSelector } from "./person_min_fieldsModel.base"
import { person_stddev_fieldsModel } from "./person_stddev_fieldsModel"
import { person_stddev_fieldsModelSelector } from "./person_stddev_fieldsModel.base"
import { person_stddev_pop_fieldsModel } from "./person_stddev_pop_fieldsModel"
import { person_stddev_pop_fieldsModelSelector } from "./person_stddev_pop_fieldsModel.base"
import { person_stddev_samp_fieldsModel } from "./person_stddev_samp_fieldsModel"
import { person_stddev_samp_fieldsModelSelector } from "./person_stddev_samp_fieldsModel.base"
import { person_sum_fieldsModel } from "./person_sum_fieldsModel"
import { person_sum_fieldsModelSelector } from "./person_sum_fieldsModel.base"
import { person_var_pop_fieldsModel } from "./person_var_pop_fieldsModel"
import { person_var_pop_fieldsModelSelector } from "./person_var_pop_fieldsModel.base"
import { person_var_samp_fieldsModel } from "./person_var_samp_fieldsModel"
import { person_var_samp_fieldsModelSelector } from "./person_var_samp_fieldsModel.base"
import { person_variance_fieldsModel } from "./person_variance_fieldsModel"
import { person_variance_fieldsModelSelector } from "./person_variance_fieldsModel.base"


/**
 * person_aggregate_fieldsBase
 * auto generated base class for the model person_aggregate_fieldsModel.
 *
 * aggregate fields of "person"
 */
export const person_aggregate_fieldsModelBase = ModelBase
  .named('person_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("person_aggregate_fields"), "person_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => person_avg_fieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => person_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => person_min_fieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => person_stddev_fieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => person_stddev_pop_fieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => person_stddev_samp_fieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => person_sum_fieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => person_var_pop_fieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => person_var_samp_fieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => person_variance_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, person_avg_fieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, person_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, person_min_fieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, person_stddev_fieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, person_stddev_pop_fieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, person_stddev_samp_fieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, person_sum_fieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, person_var_pop_fieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, person_var_samp_fieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, person_variance_fieldsModelSelector, builder) }
}
export function selectFromperson_aggregate_fields() {
  return new person_aggregate_fieldsModelSelector()
}

export const person_aggregate_fieldsModelPrimitives = selectFromperson_aggregate_fields().count
