/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenRevAvgFieldsModel } from "./GartenRevAvgFieldsModel"
import { GartenRevAvgFieldsModelSelector } from "./GartenRevAvgFieldsModel.base"
import { GartenRevMaxFieldsModel } from "./GartenRevMaxFieldsModel"
import { GartenRevMaxFieldsModelSelector } from "./GartenRevMaxFieldsModel.base"
import { GartenRevMinFieldsModel } from "./GartenRevMinFieldsModel"
import { GartenRevMinFieldsModelSelector } from "./GartenRevMinFieldsModel.base"
import { GartenRevStddevFieldsModel } from "./GartenRevStddevFieldsModel"
import { GartenRevStddevFieldsModelSelector } from "./GartenRevStddevFieldsModel.base"
import { GartenRevStddevPopFieldsModel } from "./GartenRevStddevPopFieldsModel"
import { GartenRevStddevPopFieldsModelSelector } from "./GartenRevStddevPopFieldsModel.base"
import { GartenRevStddevSampFieldsModel } from "./GartenRevStddevSampFieldsModel"
import { GartenRevStddevSampFieldsModelSelector } from "./GartenRevStddevSampFieldsModel.base"
import { GartenRevSumFieldsModel } from "./GartenRevSumFieldsModel"
import { GartenRevSumFieldsModelSelector } from "./GartenRevSumFieldsModel.base"
import { GartenRevVarPopFieldsModel } from "./GartenRevVarPopFieldsModel"
import { GartenRevVarPopFieldsModelSelector } from "./GartenRevVarPopFieldsModel.base"
import { GartenRevVarSampFieldsModel } from "./GartenRevVarSampFieldsModel"
import { GartenRevVarSampFieldsModelSelector } from "./GartenRevVarSampFieldsModel.base"
import { GartenRevVarianceFieldsModel } from "./GartenRevVarianceFieldsModel"
import { GartenRevVarianceFieldsModelSelector } from "./GartenRevVarianceFieldsModel.base"


/**
 * GartenRevAggregateFieldsBase
 * auto generated base class for the model GartenRevAggregateFieldsModel.
 *
 * aggregate fields of "garten_rev"
 */
export const GartenRevAggregateFieldsModelBase = ModelBase
  .named('GartenRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_aggregate_fields"), "garten_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => GartenRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => GartenRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => GartenRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => GartenRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => GartenRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => GartenRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => GartenRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => GartenRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => GartenRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => GartenRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, GartenRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, GartenRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, GartenRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, GartenRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, GartenRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, GartenRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, GartenRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, GartenRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, GartenRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, GartenRevVarianceFieldsModelSelector, builder) }
}
export function selectFromGartenRevAggregateFields() {
  return new GartenRevAggregateFieldsModelSelector()
}

export const gartenRevAggregateFieldsModelPrimitives = selectFromGartenRevAggregateFields().count
