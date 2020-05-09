/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionAvgFieldsModel } from "./KulturOptionAvgFieldsModel"
import { KulturOptionAvgFieldsModelSelector } from "./KulturOptionAvgFieldsModel.base"
import { KulturOptionMaxFieldsModel } from "./KulturOptionMaxFieldsModel"
import { KulturOptionMaxFieldsModelSelector } from "./KulturOptionMaxFieldsModel.base"
import { KulturOptionMinFieldsModel } from "./KulturOptionMinFieldsModel"
import { KulturOptionMinFieldsModelSelector } from "./KulturOptionMinFieldsModel.base"
import { KulturOptionStddevFieldsModel } from "./KulturOptionStddevFieldsModel"
import { KulturOptionStddevFieldsModelSelector } from "./KulturOptionStddevFieldsModel.base"
import { KulturOptionStddevPopFieldsModel } from "./KulturOptionStddevPopFieldsModel"
import { KulturOptionStddevPopFieldsModelSelector } from "./KulturOptionStddevPopFieldsModel.base"
import { KulturOptionStddevSampFieldsModel } from "./KulturOptionStddevSampFieldsModel"
import { KulturOptionStddevSampFieldsModelSelector } from "./KulturOptionStddevSampFieldsModel.base"
import { KulturOptionSumFieldsModel } from "./KulturOptionSumFieldsModel"
import { KulturOptionSumFieldsModelSelector } from "./KulturOptionSumFieldsModel.base"
import { KulturOptionVarPopFieldsModel } from "./KulturOptionVarPopFieldsModel"
import { KulturOptionVarPopFieldsModelSelector } from "./KulturOptionVarPopFieldsModel.base"
import { KulturOptionVarSampFieldsModel } from "./KulturOptionVarSampFieldsModel"
import { KulturOptionVarSampFieldsModelSelector } from "./KulturOptionVarSampFieldsModel.base"
import { KulturOptionVarianceFieldsModel } from "./KulturOptionVarianceFieldsModel"
import { KulturOptionVarianceFieldsModelSelector } from "./KulturOptionVarianceFieldsModel.base"


/**
 * KulturOptionAggregateFieldsBase
 * auto generated base class for the model KulturOptionAggregateFieldsModel.
 *
 * aggregate fields of "kultur_option"
 */
export const KulturOptionAggregateFieldsModelBase = ModelBase
  .named('KulturOptionAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_aggregate_fields"), "kultur_option_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => KulturOptionAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturOptionMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturOptionMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => KulturOptionStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => KulturOptionStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => KulturOptionStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => KulturOptionSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => KulturOptionVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => KulturOptionVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => KulturOptionVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, KulturOptionAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, KulturOptionMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturOptionMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, KulturOptionStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, KulturOptionStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, KulturOptionStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, KulturOptionSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, KulturOptionVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, KulturOptionVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, KulturOptionVarianceFieldsModelSelector, builder) }
}
export function selectFromKulturOptionAggregateFields() {
  return new KulturOptionAggregateFieldsModelSelector()
}

export const kulturOptionAggregateFieldsModelPrimitives = selectFromKulturOptionAggregateFields().count
