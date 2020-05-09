/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungRevAvgFieldsModel } from "./TeilzaehlungRevAvgFieldsModel"
import { TeilzaehlungRevAvgFieldsModelSelector } from "./TeilzaehlungRevAvgFieldsModel.base"
import { TeilzaehlungRevMaxFieldsModel } from "./TeilzaehlungRevMaxFieldsModel"
import { TeilzaehlungRevMaxFieldsModelSelector } from "./TeilzaehlungRevMaxFieldsModel.base"
import { TeilzaehlungRevMinFieldsModel } from "./TeilzaehlungRevMinFieldsModel"
import { TeilzaehlungRevMinFieldsModelSelector } from "./TeilzaehlungRevMinFieldsModel.base"
import { TeilzaehlungRevStddevFieldsModel } from "./TeilzaehlungRevStddevFieldsModel"
import { TeilzaehlungRevStddevFieldsModelSelector } from "./TeilzaehlungRevStddevFieldsModel.base"
import { TeilzaehlungRevStddevPopFieldsModel } from "./TeilzaehlungRevStddevPopFieldsModel"
import { TeilzaehlungRevStddevPopFieldsModelSelector } from "./TeilzaehlungRevStddevPopFieldsModel.base"
import { TeilzaehlungRevStddevSampFieldsModel } from "./TeilzaehlungRevStddevSampFieldsModel"
import { TeilzaehlungRevStddevSampFieldsModelSelector } from "./TeilzaehlungRevStddevSampFieldsModel.base"
import { TeilzaehlungRevSumFieldsModel } from "./TeilzaehlungRevSumFieldsModel"
import { TeilzaehlungRevSumFieldsModelSelector } from "./TeilzaehlungRevSumFieldsModel.base"
import { TeilzaehlungRevVarPopFieldsModel } from "./TeilzaehlungRevVarPopFieldsModel"
import { TeilzaehlungRevVarPopFieldsModelSelector } from "./TeilzaehlungRevVarPopFieldsModel.base"
import { TeilzaehlungRevVarSampFieldsModel } from "./TeilzaehlungRevVarSampFieldsModel"
import { TeilzaehlungRevVarSampFieldsModelSelector } from "./TeilzaehlungRevVarSampFieldsModel.base"
import { TeilzaehlungRevVarianceFieldsModel } from "./TeilzaehlungRevVarianceFieldsModel"
import { TeilzaehlungRevVarianceFieldsModelSelector } from "./TeilzaehlungRevVarianceFieldsModel.base"


/**
 * TeilzaehlungRevAggregateFieldsBase
 * auto generated base class for the model TeilzaehlungRevAggregateFieldsModel.
 *
 * aggregate fields of "teilzaehlung_rev"
 */
export const TeilzaehlungRevAggregateFieldsModelBase = ModelBase
  .named('TeilzaehlungRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_aggregate_fields"), "teilzaehlung_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, TeilzaehlungRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, TeilzaehlungRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, TeilzaehlungRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, TeilzaehlungRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, TeilzaehlungRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, TeilzaehlungRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, TeilzaehlungRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, TeilzaehlungRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, TeilzaehlungRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, TeilzaehlungRevVarianceFieldsModelSelector, builder) }
}
export function selectFromTeilzaehlungRevAggregateFields() {
  return new TeilzaehlungRevAggregateFieldsModelSelector()
}

export const teilzaehlungRevAggregateFieldsModelPrimitives = selectFromTeilzaehlungRevAggregateFields().count
