/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturRevAvgFieldsModel } from "./TeilkulturRevAvgFieldsModel"
import { TeilkulturRevAvgFieldsModelSelector } from "./TeilkulturRevAvgFieldsModel.base"
import { TeilkulturRevMaxFieldsModel } from "./TeilkulturRevMaxFieldsModel"
import { TeilkulturRevMaxFieldsModelSelector } from "./TeilkulturRevMaxFieldsModel.base"
import { TeilkulturRevMinFieldsModel } from "./TeilkulturRevMinFieldsModel"
import { TeilkulturRevMinFieldsModelSelector } from "./TeilkulturRevMinFieldsModel.base"
import { TeilkulturRevStddevFieldsModel } from "./TeilkulturRevStddevFieldsModel"
import { TeilkulturRevStddevFieldsModelSelector } from "./TeilkulturRevStddevFieldsModel.base"
import { TeilkulturRevStddevPopFieldsModel } from "./TeilkulturRevStddevPopFieldsModel"
import { TeilkulturRevStddevPopFieldsModelSelector } from "./TeilkulturRevStddevPopFieldsModel.base"
import { TeilkulturRevStddevSampFieldsModel } from "./TeilkulturRevStddevSampFieldsModel"
import { TeilkulturRevStddevSampFieldsModelSelector } from "./TeilkulturRevStddevSampFieldsModel.base"
import { TeilkulturRevSumFieldsModel } from "./TeilkulturRevSumFieldsModel"
import { TeilkulturRevSumFieldsModelSelector } from "./TeilkulturRevSumFieldsModel.base"
import { TeilkulturRevVarPopFieldsModel } from "./TeilkulturRevVarPopFieldsModel"
import { TeilkulturRevVarPopFieldsModelSelector } from "./TeilkulturRevVarPopFieldsModel.base"
import { TeilkulturRevVarSampFieldsModel } from "./TeilkulturRevVarSampFieldsModel"
import { TeilkulturRevVarSampFieldsModelSelector } from "./TeilkulturRevVarSampFieldsModel.base"
import { TeilkulturRevVarianceFieldsModel } from "./TeilkulturRevVarianceFieldsModel"
import { TeilkulturRevVarianceFieldsModelSelector } from "./TeilkulturRevVarianceFieldsModel.base"


/**
 * TeilkulturRevAggregateFieldsBase
 * auto generated base class for the model TeilkulturRevAggregateFieldsModel.
 *
 * aggregate fields of "teilkultur_rev"
 */
export const TeilkulturRevAggregateFieldsModelBase = ModelBase
  .named('TeilkulturRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_aggregate_fields"), "teilkultur_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => TeilkulturRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => TeilkulturRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => TeilkulturRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => TeilkulturRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => TeilkulturRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => TeilkulturRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => TeilkulturRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => TeilkulturRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => TeilkulturRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => TeilkulturRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, TeilkulturRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, TeilkulturRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, TeilkulturRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, TeilkulturRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, TeilkulturRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, TeilkulturRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, TeilkulturRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, TeilkulturRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, TeilkulturRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, TeilkulturRevVarianceFieldsModelSelector, builder) }
}
export function selectFromTeilkulturRevAggregateFields() {
  return new TeilkulturRevAggregateFieldsModelSelector()
}

export const teilkulturRevAggregateFieldsModelPrimitives = selectFromTeilkulturRevAggregateFields().count
