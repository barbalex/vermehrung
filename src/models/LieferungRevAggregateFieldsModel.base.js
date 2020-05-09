/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungRevAvgFieldsModel } from "./LieferungRevAvgFieldsModel"
import { LieferungRevAvgFieldsModelSelector } from "./LieferungRevAvgFieldsModel.base"
import { LieferungRevMaxFieldsModel } from "./LieferungRevMaxFieldsModel"
import { LieferungRevMaxFieldsModelSelector } from "./LieferungRevMaxFieldsModel.base"
import { LieferungRevMinFieldsModel } from "./LieferungRevMinFieldsModel"
import { LieferungRevMinFieldsModelSelector } from "./LieferungRevMinFieldsModel.base"
import { LieferungRevStddevFieldsModel } from "./LieferungRevStddevFieldsModel"
import { LieferungRevStddevFieldsModelSelector } from "./LieferungRevStddevFieldsModel.base"
import { LieferungRevStddevPopFieldsModel } from "./LieferungRevStddevPopFieldsModel"
import { LieferungRevStddevPopFieldsModelSelector } from "./LieferungRevStddevPopFieldsModel.base"
import { LieferungRevStddevSampFieldsModel } from "./LieferungRevStddevSampFieldsModel"
import { LieferungRevStddevSampFieldsModelSelector } from "./LieferungRevStddevSampFieldsModel.base"
import { LieferungRevSumFieldsModel } from "./LieferungRevSumFieldsModel"
import { LieferungRevSumFieldsModelSelector } from "./LieferungRevSumFieldsModel.base"
import { LieferungRevVarPopFieldsModel } from "./LieferungRevVarPopFieldsModel"
import { LieferungRevVarPopFieldsModelSelector } from "./LieferungRevVarPopFieldsModel.base"
import { LieferungRevVarSampFieldsModel } from "./LieferungRevVarSampFieldsModel"
import { LieferungRevVarSampFieldsModelSelector } from "./LieferungRevVarSampFieldsModel.base"
import { LieferungRevVarianceFieldsModel } from "./LieferungRevVarianceFieldsModel"
import { LieferungRevVarianceFieldsModelSelector } from "./LieferungRevVarianceFieldsModel.base"


/**
 * LieferungRevAggregateFieldsBase
 * auto generated base class for the model LieferungRevAggregateFieldsModel.
 *
 * aggregate fields of "lieferung_rev"
 */
export const LieferungRevAggregateFieldsModelBase = ModelBase
  .named('LieferungRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_aggregate_fields"), "lieferung_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => LieferungRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => LieferungRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => LieferungRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => LieferungRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => LieferungRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => LieferungRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => LieferungRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => LieferungRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => LieferungRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => LieferungRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, LieferungRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, LieferungRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, LieferungRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, LieferungRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, LieferungRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, LieferungRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, LieferungRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, LieferungRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, LieferungRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, LieferungRevVarianceFieldsModelSelector, builder) }
}
export function selectFromLieferungRevAggregateFields() {
  return new LieferungRevAggregateFieldsModelSelector()
}

export const lieferungRevAggregateFieldsModelPrimitives = selectFromLieferungRevAggregateFields().count
