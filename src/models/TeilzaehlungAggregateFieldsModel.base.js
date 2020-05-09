/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungAvgFieldsModel } from "./TeilzaehlungAvgFieldsModel"
import { TeilzaehlungAvgFieldsModelSelector } from "./TeilzaehlungAvgFieldsModel.base"
import { TeilzaehlungMaxFieldsModel } from "./TeilzaehlungMaxFieldsModel"
import { TeilzaehlungMaxFieldsModelSelector } from "./TeilzaehlungMaxFieldsModel.base"
import { TeilzaehlungMinFieldsModel } from "./TeilzaehlungMinFieldsModel"
import { TeilzaehlungMinFieldsModelSelector } from "./TeilzaehlungMinFieldsModel.base"
import { TeilzaehlungStddevFieldsModel } from "./TeilzaehlungStddevFieldsModel"
import { TeilzaehlungStddevFieldsModelSelector } from "./TeilzaehlungStddevFieldsModel.base"
import { TeilzaehlungStddevPopFieldsModel } from "./TeilzaehlungStddevPopFieldsModel"
import { TeilzaehlungStddevPopFieldsModelSelector } from "./TeilzaehlungStddevPopFieldsModel.base"
import { TeilzaehlungStddevSampFieldsModel } from "./TeilzaehlungStddevSampFieldsModel"
import { TeilzaehlungStddevSampFieldsModelSelector } from "./TeilzaehlungStddevSampFieldsModel.base"
import { TeilzaehlungSumFieldsModel } from "./TeilzaehlungSumFieldsModel"
import { TeilzaehlungSumFieldsModelSelector } from "./TeilzaehlungSumFieldsModel.base"
import { TeilzaehlungVarPopFieldsModel } from "./TeilzaehlungVarPopFieldsModel"
import { TeilzaehlungVarPopFieldsModelSelector } from "./TeilzaehlungVarPopFieldsModel.base"
import { TeilzaehlungVarSampFieldsModel } from "./TeilzaehlungVarSampFieldsModel"
import { TeilzaehlungVarSampFieldsModelSelector } from "./TeilzaehlungVarSampFieldsModel.base"
import { TeilzaehlungVarianceFieldsModel } from "./TeilzaehlungVarianceFieldsModel"
import { TeilzaehlungVarianceFieldsModelSelector } from "./TeilzaehlungVarianceFieldsModel.base"


/**
 * TeilzaehlungAggregateFieldsBase
 * auto generated base class for the model TeilzaehlungAggregateFieldsModel.
 *
 * aggregate fields of "teilzaehlung"
 */
export const TeilzaehlungAggregateFieldsModelBase = ModelBase
  .named('TeilzaehlungAggregateFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_aggregate_fields"), "teilzaehlung_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => TeilzaehlungAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => TeilzaehlungMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => TeilzaehlungMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => TeilzaehlungStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => TeilzaehlungStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => TeilzaehlungStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => TeilzaehlungSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => TeilzaehlungVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => TeilzaehlungVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => TeilzaehlungVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, TeilzaehlungAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, TeilzaehlungMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, TeilzaehlungMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, TeilzaehlungStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, TeilzaehlungStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, TeilzaehlungStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, TeilzaehlungSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, TeilzaehlungVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, TeilzaehlungVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, TeilzaehlungVarianceFieldsModelSelector, builder) }
}
export function selectFromTeilzaehlungAggregateFields() {
  return new TeilzaehlungAggregateFieldsModelSelector()
}

export const teilzaehlungAggregateFieldsModelPrimitives = selectFromTeilzaehlungAggregateFields().count
