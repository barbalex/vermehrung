/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturAvgFieldsModel } from "./KulturAvgFieldsModel"
import { KulturAvgFieldsModelSelector } from "./KulturAvgFieldsModel.base"
import { KulturMaxFieldsModel } from "./KulturMaxFieldsModel"
import { KulturMaxFieldsModelSelector } from "./KulturMaxFieldsModel.base"
import { KulturMinFieldsModel } from "./KulturMinFieldsModel"
import { KulturMinFieldsModelSelector } from "./KulturMinFieldsModel.base"
import { KulturStddevFieldsModel } from "./KulturStddevFieldsModel"
import { KulturStddevFieldsModelSelector } from "./KulturStddevFieldsModel.base"
import { KulturStddevPopFieldsModel } from "./KulturStddevPopFieldsModel"
import { KulturStddevPopFieldsModelSelector } from "./KulturStddevPopFieldsModel.base"
import { KulturStddevSampFieldsModel } from "./KulturStddevSampFieldsModel"
import { KulturStddevSampFieldsModelSelector } from "./KulturStddevSampFieldsModel.base"
import { KulturSumFieldsModel } from "./KulturSumFieldsModel"
import { KulturSumFieldsModelSelector } from "./KulturSumFieldsModel.base"
import { KulturVarPopFieldsModel } from "./KulturVarPopFieldsModel"
import { KulturVarPopFieldsModelSelector } from "./KulturVarPopFieldsModel.base"
import { KulturVarSampFieldsModel } from "./KulturVarSampFieldsModel"
import { KulturVarSampFieldsModelSelector } from "./KulturVarSampFieldsModel.base"
import { KulturVarianceFieldsModel } from "./KulturVarianceFieldsModel"
import { KulturVarianceFieldsModelSelector } from "./KulturVarianceFieldsModel.base"


/**
 * KulturAggregateFieldsBase
 * auto generated base class for the model KulturAggregateFieldsModel.
 *
 * aggregate fields of "kultur"
 */
export const KulturAggregateFieldsModelBase = ModelBase
  .named('KulturAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_aggregate_fields"), "kultur_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => KulturAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => KulturStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => KulturStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => KulturStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => KulturSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => KulturVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => KulturVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => KulturVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, KulturAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, KulturMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, KulturStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, KulturStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, KulturStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, KulturSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, KulturVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, KulturVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, KulturVarianceFieldsModelSelector, builder) }
}
export function selectFromKulturAggregateFields() {
  return new KulturAggregateFieldsModelSelector()
}

export const kulturAggregateFieldsModelPrimitives = selectFromKulturAggregateFields().count
