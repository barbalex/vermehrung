/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungAvgFieldsModel } from "./SammelLieferungAvgFieldsModel"
import { SammelLieferungAvgFieldsModelSelector } from "./SammelLieferungAvgFieldsModel.base"
import { SammelLieferungMaxFieldsModel } from "./SammelLieferungMaxFieldsModel"
import { SammelLieferungMaxFieldsModelSelector } from "./SammelLieferungMaxFieldsModel.base"
import { SammelLieferungMinFieldsModel } from "./SammelLieferungMinFieldsModel"
import { SammelLieferungMinFieldsModelSelector } from "./SammelLieferungMinFieldsModel.base"
import { SammelLieferungStddevFieldsModel } from "./SammelLieferungStddevFieldsModel"
import { SammelLieferungStddevFieldsModelSelector } from "./SammelLieferungStddevFieldsModel.base"
import { SammelLieferungStddevPopFieldsModel } from "./SammelLieferungStddevPopFieldsModel"
import { SammelLieferungStddevPopFieldsModelSelector } from "./SammelLieferungStddevPopFieldsModel.base"
import { SammelLieferungStddevSampFieldsModel } from "./SammelLieferungStddevSampFieldsModel"
import { SammelLieferungStddevSampFieldsModelSelector } from "./SammelLieferungStddevSampFieldsModel.base"
import { SammelLieferungSumFieldsModel } from "./SammelLieferungSumFieldsModel"
import { SammelLieferungSumFieldsModelSelector } from "./SammelLieferungSumFieldsModel.base"
import { SammelLieferungVarPopFieldsModel } from "./SammelLieferungVarPopFieldsModel"
import { SammelLieferungVarPopFieldsModelSelector } from "./SammelLieferungVarPopFieldsModel.base"
import { SammelLieferungVarSampFieldsModel } from "./SammelLieferungVarSampFieldsModel"
import { SammelLieferungVarSampFieldsModelSelector } from "./SammelLieferungVarSampFieldsModel.base"
import { SammelLieferungVarianceFieldsModel } from "./SammelLieferungVarianceFieldsModel"
import { SammelLieferungVarianceFieldsModelSelector } from "./SammelLieferungVarianceFieldsModel.base"


/**
 * SammelLieferungAggregateFieldsBase
 * auto generated base class for the model SammelLieferungAggregateFieldsModel.
 *
 * aggregate fields of "sammel_lieferung"
 */
export const SammelLieferungAggregateFieldsModelBase = ModelBase
  .named('SammelLieferungAggregateFields')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_aggregate_fields"), "sammel_lieferung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => SammelLieferungAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SammelLieferungMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SammelLieferungMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => SammelLieferungStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => SammelLieferungStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => SammelLieferungStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => SammelLieferungSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => SammelLieferungVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => SammelLieferungVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => SammelLieferungVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, SammelLieferungAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, SammelLieferungMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SammelLieferungMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, SammelLieferungStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, SammelLieferungStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, SammelLieferungStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, SammelLieferungSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, SammelLieferungVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, SammelLieferungVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, SammelLieferungVarianceFieldsModelSelector, builder) }
}
export function selectFromSammelLieferungAggregateFields() {
  return new SammelLieferungAggregateFieldsModelSelector()
}

export const sammelLieferungAggregateFieldsModelPrimitives = selectFromSammelLieferungAggregateFields().count
