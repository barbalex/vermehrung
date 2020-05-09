/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungRevAvgFieldsModel } from "./ZaehlungRevAvgFieldsModel"
import { ZaehlungRevAvgFieldsModelSelector } from "./ZaehlungRevAvgFieldsModel.base"
import { ZaehlungRevMaxFieldsModel } from "./ZaehlungRevMaxFieldsModel"
import { ZaehlungRevMaxFieldsModelSelector } from "./ZaehlungRevMaxFieldsModel.base"
import { ZaehlungRevMinFieldsModel } from "./ZaehlungRevMinFieldsModel"
import { ZaehlungRevMinFieldsModelSelector } from "./ZaehlungRevMinFieldsModel.base"
import { ZaehlungRevStddevFieldsModel } from "./ZaehlungRevStddevFieldsModel"
import { ZaehlungRevStddevFieldsModelSelector } from "./ZaehlungRevStddevFieldsModel.base"
import { ZaehlungRevStddevPopFieldsModel } from "./ZaehlungRevStddevPopFieldsModel"
import { ZaehlungRevStddevPopFieldsModelSelector } from "./ZaehlungRevStddevPopFieldsModel.base"
import { ZaehlungRevStddevSampFieldsModel } from "./ZaehlungRevStddevSampFieldsModel"
import { ZaehlungRevStddevSampFieldsModelSelector } from "./ZaehlungRevStddevSampFieldsModel.base"
import { ZaehlungRevSumFieldsModel } from "./ZaehlungRevSumFieldsModel"
import { ZaehlungRevSumFieldsModelSelector } from "./ZaehlungRevSumFieldsModel.base"
import { ZaehlungRevVarPopFieldsModel } from "./ZaehlungRevVarPopFieldsModel"
import { ZaehlungRevVarPopFieldsModelSelector } from "./ZaehlungRevVarPopFieldsModel.base"
import { ZaehlungRevVarSampFieldsModel } from "./ZaehlungRevVarSampFieldsModel"
import { ZaehlungRevVarSampFieldsModelSelector } from "./ZaehlungRevVarSampFieldsModel.base"
import { ZaehlungRevVarianceFieldsModel } from "./ZaehlungRevVarianceFieldsModel"
import { ZaehlungRevVarianceFieldsModelSelector } from "./ZaehlungRevVarianceFieldsModel.base"


/**
 * ZaehlungRevAggregateFieldsBase
 * auto generated base class for the model ZaehlungRevAggregateFieldsModel.
 *
 * aggregate fields of "zaehlung_rev"
 */
export const ZaehlungRevAggregateFieldsModelBase = ModelBase
  .named('ZaehlungRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_aggregate_fields"), "zaehlung_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ZaehlungRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ZaehlungRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ZaehlungRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ZaehlungRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ZaehlungRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ZaehlungRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ZaehlungRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ZaehlungRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ZaehlungRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ZaehlungRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ZaehlungRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ZaehlungRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ZaehlungRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ZaehlungRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ZaehlungRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ZaehlungRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ZaehlungRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ZaehlungRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ZaehlungRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ZaehlungRevVarianceFieldsModelSelector, builder) }
}
export function selectFromZaehlungRevAggregateFields() {
  return new ZaehlungRevAggregateFieldsModelSelector()
}

export const zaehlungRevAggregateFieldsModelPrimitives = selectFromZaehlungRevAggregateFields().count
