/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturRevAvgFieldsModel } from "./KulturRevAvgFieldsModel"
import { KulturRevAvgFieldsModelSelector } from "./KulturRevAvgFieldsModel.base"
import { KulturRevMaxFieldsModel } from "./KulturRevMaxFieldsModel"
import { KulturRevMaxFieldsModelSelector } from "./KulturRevMaxFieldsModel.base"
import { KulturRevMinFieldsModel } from "./KulturRevMinFieldsModel"
import { KulturRevMinFieldsModelSelector } from "./KulturRevMinFieldsModel.base"
import { KulturRevStddevFieldsModel } from "./KulturRevStddevFieldsModel"
import { KulturRevStddevFieldsModelSelector } from "./KulturRevStddevFieldsModel.base"
import { KulturRevStddevPopFieldsModel } from "./KulturRevStddevPopFieldsModel"
import { KulturRevStddevPopFieldsModelSelector } from "./KulturRevStddevPopFieldsModel.base"
import { KulturRevStddevSampFieldsModel } from "./KulturRevStddevSampFieldsModel"
import { KulturRevStddevSampFieldsModelSelector } from "./KulturRevStddevSampFieldsModel.base"
import { KulturRevSumFieldsModel } from "./KulturRevSumFieldsModel"
import { KulturRevSumFieldsModelSelector } from "./KulturRevSumFieldsModel.base"
import { KulturRevVarPopFieldsModel } from "./KulturRevVarPopFieldsModel"
import { KulturRevVarPopFieldsModelSelector } from "./KulturRevVarPopFieldsModel.base"
import { KulturRevVarSampFieldsModel } from "./KulturRevVarSampFieldsModel"
import { KulturRevVarSampFieldsModelSelector } from "./KulturRevVarSampFieldsModel.base"
import { KulturRevVarianceFieldsModel } from "./KulturRevVarianceFieldsModel"
import { KulturRevVarianceFieldsModelSelector } from "./KulturRevVarianceFieldsModel.base"


/**
 * KulturRevAggregateFieldsBase
 * auto generated base class for the model KulturRevAggregateFieldsModel.
 *
 * aggregate fields of "kultur_rev"
 */
export const KulturRevAggregateFieldsModelBase = ModelBase
  .named('KulturRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_aggregate_fields"), "kultur_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => KulturRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => KulturRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => KulturRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => KulturRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => KulturRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => KulturRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => KulturRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => KulturRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, KulturRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, KulturRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, KulturRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, KulturRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, KulturRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, KulturRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, KulturRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, KulturRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, KulturRevVarianceFieldsModelSelector, builder) }
}
export function selectFromKulturRevAggregateFields() {
  return new KulturRevAggregateFieldsModelSelector()
}

export const kulturRevAggregateFieldsModelPrimitives = selectFromKulturRevAggregateFields().count
