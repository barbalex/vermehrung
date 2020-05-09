/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturAvgFieldsModel } from "./TeilkulturAvgFieldsModel"
import { TeilkulturAvgFieldsModelSelector } from "./TeilkulturAvgFieldsModel.base"
import { TeilkulturMaxFieldsModel } from "./TeilkulturMaxFieldsModel"
import { TeilkulturMaxFieldsModelSelector } from "./TeilkulturMaxFieldsModel.base"
import { TeilkulturMinFieldsModel } from "./TeilkulturMinFieldsModel"
import { TeilkulturMinFieldsModelSelector } from "./TeilkulturMinFieldsModel.base"
import { TeilkulturStddevFieldsModel } from "./TeilkulturStddevFieldsModel"
import { TeilkulturStddevFieldsModelSelector } from "./TeilkulturStddevFieldsModel.base"
import { TeilkulturStddevPopFieldsModel } from "./TeilkulturStddevPopFieldsModel"
import { TeilkulturStddevPopFieldsModelSelector } from "./TeilkulturStddevPopFieldsModel.base"
import { TeilkulturStddevSampFieldsModel } from "./TeilkulturStddevSampFieldsModel"
import { TeilkulturStddevSampFieldsModelSelector } from "./TeilkulturStddevSampFieldsModel.base"
import { TeilkulturSumFieldsModel } from "./TeilkulturSumFieldsModel"
import { TeilkulturSumFieldsModelSelector } from "./TeilkulturSumFieldsModel.base"
import { TeilkulturVarPopFieldsModel } from "./TeilkulturVarPopFieldsModel"
import { TeilkulturVarPopFieldsModelSelector } from "./TeilkulturVarPopFieldsModel.base"
import { TeilkulturVarSampFieldsModel } from "./TeilkulturVarSampFieldsModel"
import { TeilkulturVarSampFieldsModelSelector } from "./TeilkulturVarSampFieldsModel.base"
import { TeilkulturVarianceFieldsModel } from "./TeilkulturVarianceFieldsModel"
import { TeilkulturVarianceFieldsModelSelector } from "./TeilkulturVarianceFieldsModel.base"


/**
 * TeilkulturAggregateFieldsBase
 * auto generated base class for the model TeilkulturAggregateFieldsModel.
 *
 * aggregate fields of "teilkultur"
 */
export const TeilkulturAggregateFieldsModelBase = ModelBase
  .named('TeilkulturAggregateFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_aggregate_fields"), "teilkultur_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => TeilkulturAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => TeilkulturMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => TeilkulturMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => TeilkulturStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => TeilkulturStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => TeilkulturStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => TeilkulturSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => TeilkulturVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => TeilkulturVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => TeilkulturVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, TeilkulturAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, TeilkulturMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, TeilkulturMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, TeilkulturStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, TeilkulturStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, TeilkulturStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, TeilkulturSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, TeilkulturVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, TeilkulturVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, TeilkulturVarianceFieldsModelSelector, builder) }
}
export function selectFromTeilkulturAggregateFields() {
  return new TeilkulturAggregateFieldsModelSelector()
}

export const teilkulturAggregateFieldsModelPrimitives = selectFromTeilkulturAggregateFields().count
