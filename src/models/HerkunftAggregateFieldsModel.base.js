/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftAvgFieldsModel } from "./HerkunftAvgFieldsModel"
import { HerkunftAvgFieldsModelSelector } from "./HerkunftAvgFieldsModel.base"
import { HerkunftMaxFieldsModel } from "./HerkunftMaxFieldsModel"
import { HerkunftMaxFieldsModelSelector } from "./HerkunftMaxFieldsModel.base"
import { HerkunftMinFieldsModel } from "./HerkunftMinFieldsModel"
import { HerkunftMinFieldsModelSelector } from "./HerkunftMinFieldsModel.base"
import { HerkunftStddevFieldsModel } from "./HerkunftStddevFieldsModel"
import { HerkunftStddevFieldsModelSelector } from "./HerkunftStddevFieldsModel.base"
import { HerkunftStddevPopFieldsModel } from "./HerkunftStddevPopFieldsModel"
import { HerkunftStddevPopFieldsModelSelector } from "./HerkunftStddevPopFieldsModel.base"
import { HerkunftStddevSampFieldsModel } from "./HerkunftStddevSampFieldsModel"
import { HerkunftStddevSampFieldsModelSelector } from "./HerkunftStddevSampFieldsModel.base"
import { HerkunftSumFieldsModel } from "./HerkunftSumFieldsModel"
import { HerkunftSumFieldsModelSelector } from "./HerkunftSumFieldsModel.base"
import { HerkunftVarPopFieldsModel } from "./HerkunftVarPopFieldsModel"
import { HerkunftVarPopFieldsModelSelector } from "./HerkunftVarPopFieldsModel.base"
import { HerkunftVarSampFieldsModel } from "./HerkunftVarSampFieldsModel"
import { HerkunftVarSampFieldsModelSelector } from "./HerkunftVarSampFieldsModel.base"
import { HerkunftVarianceFieldsModel } from "./HerkunftVarianceFieldsModel"
import { HerkunftVarianceFieldsModelSelector } from "./HerkunftVarianceFieldsModel.base"


/**
 * HerkunftAggregateFieldsBase
 * auto generated base class for the model HerkunftAggregateFieldsModel.
 *
 * aggregate fields of "herkunft"
 */
export const HerkunftAggregateFieldsModelBase = ModelBase
  .named('HerkunftAggregateFields')
  .props({
    __typename: types.optional(types.literal("herkunft_aggregate_fields"), "herkunft_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => HerkunftAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => HerkunftMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => HerkunftMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => HerkunftStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => HerkunftStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => HerkunftStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => HerkunftSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => HerkunftVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => HerkunftVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => HerkunftVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, HerkunftAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, HerkunftMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, HerkunftMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, HerkunftStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, HerkunftStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, HerkunftStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, HerkunftSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, HerkunftVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, HerkunftVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, HerkunftVarianceFieldsModelSelector, builder) }
}
export function selectFromHerkunftAggregateFields() {
  return new HerkunftAggregateFieldsModelSelector()
}

export const herkunftAggregateFieldsModelPrimitives = selectFromHerkunftAggregateFields().count
