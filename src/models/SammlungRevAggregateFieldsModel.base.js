/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungRevAvgFieldsModel } from "./SammlungRevAvgFieldsModel"
import { SammlungRevAvgFieldsModelSelector } from "./SammlungRevAvgFieldsModel.base"
import { SammlungRevMaxFieldsModel } from "./SammlungRevMaxFieldsModel"
import { SammlungRevMaxFieldsModelSelector } from "./SammlungRevMaxFieldsModel.base"
import { SammlungRevMinFieldsModel } from "./SammlungRevMinFieldsModel"
import { SammlungRevMinFieldsModelSelector } from "./SammlungRevMinFieldsModel.base"
import { SammlungRevStddevFieldsModel } from "./SammlungRevStddevFieldsModel"
import { SammlungRevStddevFieldsModelSelector } from "./SammlungRevStddevFieldsModel.base"
import { SammlungRevStddevPopFieldsModel } from "./SammlungRevStddevPopFieldsModel"
import { SammlungRevStddevPopFieldsModelSelector } from "./SammlungRevStddevPopFieldsModel.base"
import { SammlungRevStddevSampFieldsModel } from "./SammlungRevStddevSampFieldsModel"
import { SammlungRevStddevSampFieldsModelSelector } from "./SammlungRevStddevSampFieldsModel.base"
import { SammlungRevSumFieldsModel } from "./SammlungRevSumFieldsModel"
import { SammlungRevSumFieldsModelSelector } from "./SammlungRevSumFieldsModel.base"
import { SammlungRevVarPopFieldsModel } from "./SammlungRevVarPopFieldsModel"
import { SammlungRevVarPopFieldsModelSelector } from "./SammlungRevVarPopFieldsModel.base"
import { SammlungRevVarSampFieldsModel } from "./SammlungRevVarSampFieldsModel"
import { SammlungRevVarSampFieldsModelSelector } from "./SammlungRevVarSampFieldsModel.base"
import { SammlungRevVarianceFieldsModel } from "./SammlungRevVarianceFieldsModel"
import { SammlungRevVarianceFieldsModelSelector } from "./SammlungRevVarianceFieldsModel.base"


/**
 * SammlungRevAggregateFieldsBase
 * auto generated base class for the model SammlungRevAggregateFieldsModel.
 *
 * aggregate fields of "sammlung_rev"
 */
export const SammlungRevAggregateFieldsModelBase = ModelBase
  .named('SammlungRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_aggregate_fields"), "sammlung_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => SammlungRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SammlungRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SammlungRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => SammlungRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => SammlungRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => SammlungRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => SammlungRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => SammlungRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => SammlungRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => SammlungRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, SammlungRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, SammlungRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SammlungRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, SammlungRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, SammlungRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, SammlungRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, SammlungRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, SammlungRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, SammlungRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, SammlungRevVarianceFieldsModelSelector, builder) }
}
export function selectFromSammlungRevAggregateFields() {
  return new SammlungRevAggregateFieldsModelSelector()
}

export const sammlungRevAggregateFieldsModelPrimitives = selectFromSammlungRevAggregateFields().count
