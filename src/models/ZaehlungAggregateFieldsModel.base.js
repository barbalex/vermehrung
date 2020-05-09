/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungAvgFieldsModel } from "./ZaehlungAvgFieldsModel"
import { ZaehlungAvgFieldsModelSelector } from "./ZaehlungAvgFieldsModel.base"
import { ZaehlungMaxFieldsModel } from "./ZaehlungMaxFieldsModel"
import { ZaehlungMaxFieldsModelSelector } from "./ZaehlungMaxFieldsModel.base"
import { ZaehlungMinFieldsModel } from "./ZaehlungMinFieldsModel"
import { ZaehlungMinFieldsModelSelector } from "./ZaehlungMinFieldsModel.base"
import { ZaehlungStddevFieldsModel } from "./ZaehlungStddevFieldsModel"
import { ZaehlungStddevFieldsModelSelector } from "./ZaehlungStddevFieldsModel.base"
import { ZaehlungStddevPopFieldsModel } from "./ZaehlungStddevPopFieldsModel"
import { ZaehlungStddevPopFieldsModelSelector } from "./ZaehlungStddevPopFieldsModel.base"
import { ZaehlungStddevSampFieldsModel } from "./ZaehlungStddevSampFieldsModel"
import { ZaehlungStddevSampFieldsModelSelector } from "./ZaehlungStddevSampFieldsModel.base"
import { ZaehlungSumFieldsModel } from "./ZaehlungSumFieldsModel"
import { ZaehlungSumFieldsModelSelector } from "./ZaehlungSumFieldsModel.base"
import { ZaehlungVarPopFieldsModel } from "./ZaehlungVarPopFieldsModel"
import { ZaehlungVarPopFieldsModelSelector } from "./ZaehlungVarPopFieldsModel.base"
import { ZaehlungVarSampFieldsModel } from "./ZaehlungVarSampFieldsModel"
import { ZaehlungVarSampFieldsModelSelector } from "./ZaehlungVarSampFieldsModel.base"
import { ZaehlungVarianceFieldsModel } from "./ZaehlungVarianceFieldsModel"
import { ZaehlungVarianceFieldsModelSelector } from "./ZaehlungVarianceFieldsModel.base"


/**
 * ZaehlungAggregateFieldsBase
 * auto generated base class for the model ZaehlungAggregateFieldsModel.
 *
 * aggregate fields of "zaehlung"
 */
export const ZaehlungAggregateFieldsModelBase = ModelBase
  .named('ZaehlungAggregateFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_aggregate_fields"), "zaehlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ZaehlungAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ZaehlungMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ZaehlungMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ZaehlungStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ZaehlungStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ZaehlungStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ZaehlungSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ZaehlungVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ZaehlungVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ZaehlungVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ZaehlungAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ZaehlungMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ZaehlungMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ZaehlungStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ZaehlungStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ZaehlungStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ZaehlungSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ZaehlungVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ZaehlungVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ZaehlungVarianceFieldsModelSelector, builder) }
}
export function selectFromZaehlungAggregateFields() {
  return new ZaehlungAggregateFieldsModelSelector()
}

export const zaehlungAggregateFieldsModelPrimitives = selectFromZaehlungAggregateFields().count
