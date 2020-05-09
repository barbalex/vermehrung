/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenAvgFieldsModel } from "./GartenAvgFieldsModel"
import { GartenAvgFieldsModelSelector } from "./GartenAvgFieldsModel.base"
import { GartenMaxFieldsModel } from "./GartenMaxFieldsModel"
import { GartenMaxFieldsModelSelector } from "./GartenMaxFieldsModel.base"
import { GartenMinFieldsModel } from "./GartenMinFieldsModel"
import { GartenMinFieldsModelSelector } from "./GartenMinFieldsModel.base"
import { GartenStddevFieldsModel } from "./GartenStddevFieldsModel"
import { GartenStddevFieldsModelSelector } from "./GartenStddevFieldsModel.base"
import { GartenStddevPopFieldsModel } from "./GartenStddevPopFieldsModel"
import { GartenStddevPopFieldsModelSelector } from "./GartenStddevPopFieldsModel.base"
import { GartenStddevSampFieldsModel } from "./GartenStddevSampFieldsModel"
import { GartenStddevSampFieldsModelSelector } from "./GartenStddevSampFieldsModel.base"
import { GartenSumFieldsModel } from "./GartenSumFieldsModel"
import { GartenSumFieldsModelSelector } from "./GartenSumFieldsModel.base"
import { GartenVarPopFieldsModel } from "./GartenVarPopFieldsModel"
import { GartenVarPopFieldsModelSelector } from "./GartenVarPopFieldsModel.base"
import { GartenVarSampFieldsModel } from "./GartenVarSampFieldsModel"
import { GartenVarSampFieldsModelSelector } from "./GartenVarSampFieldsModel.base"
import { GartenVarianceFieldsModel } from "./GartenVarianceFieldsModel"
import { GartenVarianceFieldsModelSelector } from "./GartenVarianceFieldsModel.base"


/**
 * GartenAggregateFieldsBase
 * auto generated base class for the model GartenAggregateFieldsModel.
 *
 * aggregate fields of "garten"
 */
export const GartenAggregateFieldsModelBase = ModelBase
  .named('GartenAggregateFields')
  .props({
    __typename: types.optional(types.literal("garten_aggregate_fields"), "garten_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => GartenAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => GartenMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => GartenMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => GartenStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => GartenStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => GartenStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => GartenSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => GartenVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => GartenVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => GartenVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, GartenAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, GartenMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, GartenMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, GartenStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, GartenStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, GartenStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, GartenSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, GartenVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, GartenVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, GartenVarianceFieldsModelSelector, builder) }
}
export function selectFromGartenAggregateFields() {
  return new GartenAggregateFieldsModelSelector()
}

export const gartenAggregateFieldsModelPrimitives = selectFromGartenAggregateFields().count
