/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungRevAvgFieldsModel } from "./SammelLieferungRevAvgFieldsModel"
import { SammelLieferungRevAvgFieldsModelSelector } from "./SammelLieferungRevAvgFieldsModel.base"
import { SammelLieferungRevMaxFieldsModel } from "./SammelLieferungRevMaxFieldsModel"
import { SammelLieferungRevMaxFieldsModelSelector } from "./SammelLieferungRevMaxFieldsModel.base"
import { SammelLieferungRevMinFieldsModel } from "./SammelLieferungRevMinFieldsModel"
import { SammelLieferungRevMinFieldsModelSelector } from "./SammelLieferungRevMinFieldsModel.base"
import { SammelLieferungRevStddevFieldsModel } from "./SammelLieferungRevStddevFieldsModel"
import { SammelLieferungRevStddevFieldsModelSelector } from "./SammelLieferungRevStddevFieldsModel.base"
import { SammelLieferungRevStddevPopFieldsModel } from "./SammelLieferungRevStddevPopFieldsModel"
import { SammelLieferungRevStddevPopFieldsModelSelector } from "./SammelLieferungRevStddevPopFieldsModel.base"
import { SammelLieferungRevStddevSampFieldsModel } from "./SammelLieferungRevStddevSampFieldsModel"
import { SammelLieferungRevStddevSampFieldsModelSelector } from "./SammelLieferungRevStddevSampFieldsModel.base"
import { SammelLieferungRevSumFieldsModel } from "./SammelLieferungRevSumFieldsModel"
import { SammelLieferungRevSumFieldsModelSelector } from "./SammelLieferungRevSumFieldsModel.base"
import { SammelLieferungRevVarPopFieldsModel } from "./SammelLieferungRevVarPopFieldsModel"
import { SammelLieferungRevVarPopFieldsModelSelector } from "./SammelLieferungRevVarPopFieldsModel.base"
import { SammelLieferungRevVarSampFieldsModel } from "./SammelLieferungRevVarSampFieldsModel"
import { SammelLieferungRevVarSampFieldsModelSelector } from "./SammelLieferungRevVarSampFieldsModel.base"
import { SammelLieferungRevVarianceFieldsModel } from "./SammelLieferungRevVarianceFieldsModel"
import { SammelLieferungRevVarianceFieldsModelSelector } from "./SammelLieferungRevVarianceFieldsModel.base"


/**
 * SammelLieferungRevAggregateFieldsBase
 * auto generated base class for the model SammelLieferungRevAggregateFieldsModel.
 *
 * aggregate fields of "sammel_lieferung_rev"
 */
export const SammelLieferungRevAggregateFieldsModelBase = ModelBase
  .named('SammelLieferungRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_rev_aggregate_fields"), "sammel_lieferung_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, SammelLieferungRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, SammelLieferungRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SammelLieferungRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, SammelLieferungRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, SammelLieferungRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, SammelLieferungRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, SammelLieferungRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, SammelLieferungRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, SammelLieferungRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, SammelLieferungRevVarianceFieldsModelSelector, builder) }
}
export function selectFromSammelLieferungRevAggregateFields() {
  return new SammelLieferungRevAggregateFieldsModelSelector()
}

export const sammelLieferungRevAggregateFieldsModelPrimitives = selectFromSammelLieferungRevAggregateFields().count
