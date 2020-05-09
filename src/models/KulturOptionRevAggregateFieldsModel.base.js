/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionRevAvgFieldsModel } from "./KulturOptionRevAvgFieldsModel"
import { KulturOptionRevAvgFieldsModelSelector } from "./KulturOptionRevAvgFieldsModel.base"
import { KulturOptionRevMaxFieldsModel } from "./KulturOptionRevMaxFieldsModel"
import { KulturOptionRevMaxFieldsModelSelector } from "./KulturOptionRevMaxFieldsModel.base"
import { KulturOptionRevMinFieldsModel } from "./KulturOptionRevMinFieldsModel"
import { KulturOptionRevMinFieldsModelSelector } from "./KulturOptionRevMinFieldsModel.base"
import { KulturOptionRevStddevFieldsModel } from "./KulturOptionRevStddevFieldsModel"
import { KulturOptionRevStddevFieldsModelSelector } from "./KulturOptionRevStddevFieldsModel.base"
import { KulturOptionRevStddevPopFieldsModel } from "./KulturOptionRevStddevPopFieldsModel"
import { KulturOptionRevStddevPopFieldsModelSelector } from "./KulturOptionRevStddevPopFieldsModel.base"
import { KulturOptionRevStddevSampFieldsModel } from "./KulturOptionRevStddevSampFieldsModel"
import { KulturOptionRevStddevSampFieldsModelSelector } from "./KulturOptionRevStddevSampFieldsModel.base"
import { KulturOptionRevSumFieldsModel } from "./KulturOptionRevSumFieldsModel"
import { KulturOptionRevSumFieldsModelSelector } from "./KulturOptionRevSumFieldsModel.base"
import { KulturOptionRevVarPopFieldsModel } from "./KulturOptionRevVarPopFieldsModel"
import { KulturOptionRevVarPopFieldsModelSelector } from "./KulturOptionRevVarPopFieldsModel.base"
import { KulturOptionRevVarSampFieldsModel } from "./KulturOptionRevVarSampFieldsModel"
import { KulturOptionRevVarSampFieldsModelSelector } from "./KulturOptionRevVarSampFieldsModel.base"
import { KulturOptionRevVarianceFieldsModel } from "./KulturOptionRevVarianceFieldsModel"
import { KulturOptionRevVarianceFieldsModelSelector } from "./KulturOptionRevVarianceFieldsModel.base"


/**
 * KulturOptionRevAggregateFieldsBase
 * auto generated base class for the model KulturOptionRevAggregateFieldsModel.
 *
 * aggregate fields of "kultur_option_rev"
 */
export const KulturOptionRevAggregateFieldsModelBase = ModelBase
  .named('KulturOptionRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_aggregate_fields"), "kultur_option_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => KulturOptionRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturOptionRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturOptionRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => KulturOptionRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => KulturOptionRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => KulturOptionRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => KulturOptionRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => KulturOptionRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => KulturOptionRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => KulturOptionRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, KulturOptionRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, KulturOptionRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturOptionRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, KulturOptionRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, KulturOptionRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, KulturOptionRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, KulturOptionRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, KulturOptionRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, KulturOptionRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, KulturOptionRevVarianceFieldsModelSelector, builder) }
}
export function selectFromKulturOptionRevAggregateFields() {
  return new KulturOptionRevAggregateFieldsModelSelector()
}

export const kulturOptionRevAggregateFieldsModelPrimitives = selectFromKulturOptionRevAggregateFields().count
