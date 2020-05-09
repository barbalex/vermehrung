/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungAvgFieldsModel } from "./SammlungAvgFieldsModel"
import { SammlungAvgFieldsModelSelector } from "./SammlungAvgFieldsModel.base"
import { SammlungMaxFieldsModel } from "./SammlungMaxFieldsModel"
import { SammlungMaxFieldsModelSelector } from "./SammlungMaxFieldsModel.base"
import { SammlungMinFieldsModel } from "./SammlungMinFieldsModel"
import { SammlungMinFieldsModelSelector } from "./SammlungMinFieldsModel.base"
import { SammlungStddevFieldsModel } from "./SammlungStddevFieldsModel"
import { SammlungStddevFieldsModelSelector } from "./SammlungStddevFieldsModel.base"
import { SammlungStddevPopFieldsModel } from "./SammlungStddevPopFieldsModel"
import { SammlungStddevPopFieldsModelSelector } from "./SammlungStddevPopFieldsModel.base"
import { SammlungStddevSampFieldsModel } from "./SammlungStddevSampFieldsModel"
import { SammlungStddevSampFieldsModelSelector } from "./SammlungStddevSampFieldsModel.base"
import { SammlungSumFieldsModel } from "./SammlungSumFieldsModel"
import { SammlungSumFieldsModelSelector } from "./SammlungSumFieldsModel.base"
import { SammlungVarPopFieldsModel } from "./SammlungVarPopFieldsModel"
import { SammlungVarPopFieldsModelSelector } from "./SammlungVarPopFieldsModel.base"
import { SammlungVarSampFieldsModel } from "./SammlungVarSampFieldsModel"
import { SammlungVarSampFieldsModelSelector } from "./SammlungVarSampFieldsModel.base"
import { SammlungVarianceFieldsModel } from "./SammlungVarianceFieldsModel"
import { SammlungVarianceFieldsModelSelector } from "./SammlungVarianceFieldsModel.base"


/**
 * SammlungAggregateFieldsBase
 * auto generated base class for the model SammlungAggregateFieldsModel.
 *
 * aggregate fields of "sammlung"
 */
export const SammlungAggregateFieldsModelBase = ModelBase
  .named('SammlungAggregateFields')
  .props({
    __typename: types.optional(types.literal("sammlung_aggregate_fields"), "sammlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => SammlungAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SammlungMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SammlungMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => SammlungStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => SammlungStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => SammlungStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => SammlungSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => SammlungVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => SammlungVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => SammlungVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, SammlungAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, SammlungMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SammlungMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, SammlungStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, SammlungStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, SammlungStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, SammlungSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, SammlungVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, SammlungVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, SammlungVarianceFieldsModelSelector, builder) }
}
export function selectFromSammlungAggregateFields() {
  return new SammlungAggregateFieldsModelSelector()
}

export const sammlungAggregateFieldsModelPrimitives = selectFromSammlungAggregateFields().count
