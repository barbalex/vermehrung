/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftSumsAvgFieldsModel } from "./HerkunftSumsAvgFieldsModel"
import { HerkunftSumsAvgFieldsModelSelector } from "./HerkunftSumsAvgFieldsModel.base"
import { HerkunftSumsMaxFieldsModel } from "./HerkunftSumsMaxFieldsModel"
import { HerkunftSumsMaxFieldsModelSelector } from "./HerkunftSumsMaxFieldsModel.base"
import { HerkunftSumsMinFieldsModel } from "./HerkunftSumsMinFieldsModel"
import { HerkunftSumsMinFieldsModelSelector } from "./HerkunftSumsMinFieldsModel.base"
import { HerkunftSumsStddevFieldsModel } from "./HerkunftSumsStddevFieldsModel"
import { HerkunftSumsStddevFieldsModelSelector } from "./HerkunftSumsStddevFieldsModel.base"
import { HerkunftSumsStddevPopFieldsModel } from "./HerkunftSumsStddevPopFieldsModel"
import { HerkunftSumsStddevPopFieldsModelSelector } from "./HerkunftSumsStddevPopFieldsModel.base"
import { HerkunftSumsStddevSampFieldsModel } from "./HerkunftSumsStddevSampFieldsModel"
import { HerkunftSumsStddevSampFieldsModelSelector } from "./HerkunftSumsStddevSampFieldsModel.base"
import { HerkunftSumsSumFieldsModel } from "./HerkunftSumsSumFieldsModel"
import { HerkunftSumsSumFieldsModelSelector } from "./HerkunftSumsSumFieldsModel.base"
import { HerkunftSumsVarPopFieldsModel } from "./HerkunftSumsVarPopFieldsModel"
import { HerkunftSumsVarPopFieldsModelSelector } from "./HerkunftSumsVarPopFieldsModel.base"
import { HerkunftSumsVarSampFieldsModel } from "./HerkunftSumsVarSampFieldsModel"
import { HerkunftSumsVarSampFieldsModelSelector } from "./HerkunftSumsVarSampFieldsModel.base"
import { HerkunftSumsVarianceFieldsModel } from "./HerkunftSumsVarianceFieldsModel"
import { HerkunftSumsVarianceFieldsModelSelector } from "./HerkunftSumsVarianceFieldsModel.base"


/**
 * HerkunftSumsAggregateFieldsBase
 * auto generated base class for the model HerkunftSumsAggregateFieldsModel.
 *
 * aggregate fields of "herkunft_sums"
 */
export const HerkunftSumsAggregateFieldsModelBase = ModelBase
  .named('HerkunftSumsAggregateFields')
  .props({
    __typename: types.optional(types.literal("herkunft_sums_aggregate_fields"), "herkunft_sums_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => HerkunftSumsAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => HerkunftSumsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => HerkunftSumsMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => HerkunftSumsStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => HerkunftSumsStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => HerkunftSumsStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => HerkunftSumsSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => HerkunftSumsVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => HerkunftSumsVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => HerkunftSumsVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftSumsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, HerkunftSumsAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, HerkunftSumsMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, HerkunftSumsMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, HerkunftSumsStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, HerkunftSumsStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, HerkunftSumsStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, HerkunftSumsSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, HerkunftSumsVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, HerkunftSumsVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, HerkunftSumsVarianceFieldsModelSelector, builder) }
}
export function selectFromHerkunftSumsAggregateFields() {
  return new HerkunftSumsAggregateFieldsModelSelector()
}

export const herkunftSumsAggregateFieldsModelPrimitives = selectFromHerkunftSumsAggregateFields().count
