/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkAvgFieldsModel } from "./KulturQkAvgFieldsModel"
import { KulturQkAvgFieldsModelSelector } from "./KulturQkAvgFieldsModel.base"
import { KulturQkMaxFieldsModel } from "./KulturQkMaxFieldsModel"
import { KulturQkMaxFieldsModelSelector } from "./KulturQkMaxFieldsModel.base"
import { KulturQkMinFieldsModel } from "./KulturQkMinFieldsModel"
import { KulturQkMinFieldsModelSelector } from "./KulturQkMinFieldsModel.base"
import { KulturQkStddevFieldsModel } from "./KulturQkStddevFieldsModel"
import { KulturQkStddevFieldsModelSelector } from "./KulturQkStddevFieldsModel.base"
import { KulturQkStddevPopFieldsModel } from "./KulturQkStddevPopFieldsModel"
import { KulturQkStddevPopFieldsModelSelector } from "./KulturQkStddevPopFieldsModel.base"
import { KulturQkStddevSampFieldsModel } from "./KulturQkStddevSampFieldsModel"
import { KulturQkStddevSampFieldsModelSelector } from "./KulturQkStddevSampFieldsModel.base"
import { KulturQkSumFieldsModel } from "./KulturQkSumFieldsModel"
import { KulturQkSumFieldsModelSelector } from "./KulturQkSumFieldsModel.base"
import { KulturQkVarPopFieldsModel } from "./KulturQkVarPopFieldsModel"
import { KulturQkVarPopFieldsModelSelector } from "./KulturQkVarPopFieldsModel.base"
import { KulturQkVarSampFieldsModel } from "./KulturQkVarSampFieldsModel"
import { KulturQkVarSampFieldsModelSelector } from "./KulturQkVarSampFieldsModel.base"
import { KulturQkVarianceFieldsModel } from "./KulturQkVarianceFieldsModel"
import { KulturQkVarianceFieldsModelSelector } from "./KulturQkVarianceFieldsModel.base"


/**
 * KulturQkAggregateFieldsBase
 * auto generated base class for the model KulturQkAggregateFieldsModel.
 *
 * aggregate fields of "kultur_qk"
 */
export const KulturQkAggregateFieldsModelBase = ModelBase
  .named('KulturQkAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_aggregate_fields"), "kultur_qk_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => KulturQkAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturQkMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturQkMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => KulturQkStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => KulturQkStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => KulturQkStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => KulturQkSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => KulturQkVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => KulturQkVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => KulturQkVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, KulturQkAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, KulturQkMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturQkMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, KulturQkStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, KulturQkStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, KulturQkStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, KulturQkSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, KulturQkVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, KulturQkVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, KulturQkVarianceFieldsModelSelector, builder) }
}
export function selectFromKulturQkAggregateFields() {
  return new KulturQkAggregateFieldsModelSelector()
}

export const kulturQkAggregateFieldsModelPrimitives = selectFromKulturQkAggregateFields().count
