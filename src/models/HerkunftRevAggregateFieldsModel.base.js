/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftRevAvgFieldsModel } from "./HerkunftRevAvgFieldsModel"
import { HerkunftRevAvgFieldsModelSelector } from "./HerkunftRevAvgFieldsModel.base"
import { HerkunftRevMaxFieldsModel } from "./HerkunftRevMaxFieldsModel"
import { HerkunftRevMaxFieldsModelSelector } from "./HerkunftRevMaxFieldsModel.base"
import { HerkunftRevMinFieldsModel } from "./HerkunftRevMinFieldsModel"
import { HerkunftRevMinFieldsModelSelector } from "./HerkunftRevMinFieldsModel.base"
import { HerkunftRevStddevFieldsModel } from "./HerkunftRevStddevFieldsModel"
import { HerkunftRevStddevFieldsModelSelector } from "./HerkunftRevStddevFieldsModel.base"
import { HerkunftRevStddevPopFieldsModel } from "./HerkunftRevStddevPopFieldsModel"
import { HerkunftRevStddevPopFieldsModelSelector } from "./HerkunftRevStddevPopFieldsModel.base"
import { HerkunftRevStddevSampFieldsModel } from "./HerkunftRevStddevSampFieldsModel"
import { HerkunftRevStddevSampFieldsModelSelector } from "./HerkunftRevStddevSampFieldsModel.base"
import { HerkunftRevSumFieldsModel } from "./HerkunftRevSumFieldsModel"
import { HerkunftRevSumFieldsModelSelector } from "./HerkunftRevSumFieldsModel.base"
import { HerkunftRevVarPopFieldsModel } from "./HerkunftRevVarPopFieldsModel"
import { HerkunftRevVarPopFieldsModelSelector } from "./HerkunftRevVarPopFieldsModel.base"
import { HerkunftRevVarSampFieldsModel } from "./HerkunftRevVarSampFieldsModel"
import { HerkunftRevVarSampFieldsModelSelector } from "./HerkunftRevVarSampFieldsModel.base"
import { HerkunftRevVarianceFieldsModel } from "./HerkunftRevVarianceFieldsModel"
import { HerkunftRevVarianceFieldsModelSelector } from "./HerkunftRevVarianceFieldsModel.base"


/**
 * HerkunftRevAggregateFieldsBase
 * auto generated base class for the model HerkunftRevAggregateFieldsModel.
 *
 * aggregate fields of "herkunft_rev"
 */
export const HerkunftRevAggregateFieldsModelBase = ModelBase
  .named('HerkunftRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_aggregate_fields"), "herkunft_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => HerkunftRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => HerkunftRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => HerkunftRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => HerkunftRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => HerkunftRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => HerkunftRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => HerkunftRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => HerkunftRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => HerkunftRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => HerkunftRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, HerkunftRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, HerkunftRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, HerkunftRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, HerkunftRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, HerkunftRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, HerkunftRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, HerkunftRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, HerkunftRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, HerkunftRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, HerkunftRevVarianceFieldsModelSelector, builder) }
}
export function selectFromHerkunftRevAggregateFields() {
  return new HerkunftRevAggregateFieldsModelSelector()
}

export const herkunftRevAggregateFieldsModelPrimitives = selectFromHerkunftRevAggregateFields().count
