/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenTeilzaehlungSumsAvgFieldsModel } from "./GartenTeilzaehlungSumsAvgFieldsModel"
import { GartenTeilzaehlungSumsAvgFieldsModelSelector } from "./GartenTeilzaehlungSumsAvgFieldsModel.base"
import { GartenTeilzaehlungSumsMaxFieldsModel } from "./GartenTeilzaehlungSumsMaxFieldsModel"
import { GartenTeilzaehlungSumsMaxFieldsModelSelector } from "./GartenTeilzaehlungSumsMaxFieldsModel.base"
import { GartenTeilzaehlungSumsMinFieldsModel } from "./GartenTeilzaehlungSumsMinFieldsModel"
import { GartenTeilzaehlungSumsMinFieldsModelSelector } from "./GartenTeilzaehlungSumsMinFieldsModel.base"
import { GartenTeilzaehlungSumsStddevFieldsModel } from "./GartenTeilzaehlungSumsStddevFieldsModel"
import { GartenTeilzaehlungSumsStddevFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevFieldsModel.base"
import { GartenTeilzaehlungSumsStddevPopFieldsModel } from "./GartenTeilzaehlungSumsStddevPopFieldsModel"
import { GartenTeilzaehlungSumsStddevPopFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevPopFieldsModel.base"
import { GartenTeilzaehlungSumsStddevSampFieldsModel } from "./GartenTeilzaehlungSumsStddevSampFieldsModel"
import { GartenTeilzaehlungSumsStddevSampFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevSampFieldsModel.base"
import { GartenTeilzaehlungSumsSumFieldsModel } from "./GartenTeilzaehlungSumsSumFieldsModel"
import { GartenTeilzaehlungSumsSumFieldsModelSelector } from "./GartenTeilzaehlungSumsSumFieldsModel.base"
import { GartenTeilzaehlungSumsVarPopFieldsModel } from "./GartenTeilzaehlungSumsVarPopFieldsModel"
import { GartenTeilzaehlungSumsVarPopFieldsModelSelector } from "./GartenTeilzaehlungSumsVarPopFieldsModel.base"
import { GartenTeilzaehlungSumsVarSampFieldsModel } from "./GartenTeilzaehlungSumsVarSampFieldsModel"
import { GartenTeilzaehlungSumsVarSampFieldsModelSelector } from "./GartenTeilzaehlungSumsVarSampFieldsModel.base"
import { GartenTeilzaehlungSumsVarianceFieldsModel } from "./GartenTeilzaehlungSumsVarianceFieldsModel"
import { GartenTeilzaehlungSumsVarianceFieldsModelSelector } from "./GartenTeilzaehlungSumsVarianceFieldsModel.base"


/**
 * GartenTeilzaehlungSumsAggregateFieldsBase
 * auto generated base class for the model GartenTeilzaehlungSumsAggregateFieldsModel.
 *
 * aggregate fields of "garten_teilzaehlung_sums"
 */
export const GartenTeilzaehlungSumsAggregateFieldsModelBase = ModelBase
  .named('GartenTeilzaehlungSumsAggregateFields')
  .props({
    __typename: types.optional(types.literal("garten_teilzaehlung_sums_aggregate_fields"), "garten_teilzaehlung_sums_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenTeilzaehlungSumsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, GartenTeilzaehlungSumsAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, GartenTeilzaehlungSumsMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, GartenTeilzaehlungSumsMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, GartenTeilzaehlungSumsStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, GartenTeilzaehlungSumsStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, GartenTeilzaehlungSumsStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, GartenTeilzaehlungSumsSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, GartenTeilzaehlungSumsVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, GartenTeilzaehlungSumsVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, GartenTeilzaehlungSumsVarianceFieldsModelSelector, builder) }
}
export function selectFromGartenTeilzaehlungSumsAggregateFields() {
  return new GartenTeilzaehlungSumsAggregateFieldsModelSelector()
}

export const gartenTeilzaehlungSumsAggregateFieldsModelPrimitives = selectFromGartenTeilzaehlungSumsAggregateFields().count
