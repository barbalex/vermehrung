/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungAvgFieldsModel } from "./LieferungAvgFieldsModel"
import { LieferungAvgFieldsModelSelector } from "./LieferungAvgFieldsModel.base"
import { LieferungMaxFieldsModel } from "./LieferungMaxFieldsModel"
import { LieferungMaxFieldsModelSelector } from "./LieferungMaxFieldsModel.base"
import { LieferungMinFieldsModel } from "./LieferungMinFieldsModel"
import { LieferungMinFieldsModelSelector } from "./LieferungMinFieldsModel.base"
import { LieferungStddevFieldsModel } from "./LieferungStddevFieldsModel"
import { LieferungStddevFieldsModelSelector } from "./LieferungStddevFieldsModel.base"
import { LieferungStddevPopFieldsModel } from "./LieferungStddevPopFieldsModel"
import { LieferungStddevPopFieldsModelSelector } from "./LieferungStddevPopFieldsModel.base"
import { LieferungStddevSampFieldsModel } from "./LieferungStddevSampFieldsModel"
import { LieferungStddevSampFieldsModelSelector } from "./LieferungStddevSampFieldsModel.base"
import { LieferungSumFieldsModel } from "./LieferungSumFieldsModel"
import { LieferungSumFieldsModelSelector } from "./LieferungSumFieldsModel.base"
import { LieferungVarPopFieldsModel } from "./LieferungVarPopFieldsModel"
import { LieferungVarPopFieldsModelSelector } from "./LieferungVarPopFieldsModel.base"
import { LieferungVarSampFieldsModel } from "./LieferungVarSampFieldsModel"
import { LieferungVarSampFieldsModelSelector } from "./LieferungVarSampFieldsModel.base"
import { LieferungVarianceFieldsModel } from "./LieferungVarianceFieldsModel"
import { LieferungVarianceFieldsModelSelector } from "./LieferungVarianceFieldsModel.base"


/**
 * LieferungAggregateFieldsBase
 * auto generated base class for the model LieferungAggregateFieldsModel.
 *
 * aggregate fields of "lieferung"
 */
export const LieferungAggregateFieldsModelBase = ModelBase
  .named('LieferungAggregateFields')
  .props({
    __typename: types.optional(types.literal("lieferung_aggregate_fields"), "lieferung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => LieferungAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => LieferungMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => LieferungMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => LieferungStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => LieferungStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => LieferungStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => LieferungSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => LieferungVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => LieferungVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => LieferungVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, LieferungAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, LieferungMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, LieferungMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, LieferungStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, LieferungStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, LieferungStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, LieferungSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, LieferungVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, LieferungVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, LieferungVarianceFieldsModelSelector, builder) }
}
export function selectFromLieferungAggregateFields() {
  return new LieferungAggregateFieldsModelSelector()
}

export const lieferungAggregateFieldsModelPrimitives = selectFromLieferungAggregateFields().count
