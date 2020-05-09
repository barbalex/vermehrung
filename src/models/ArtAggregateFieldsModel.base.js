/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtAvgFieldsModel } from "./ArtAvgFieldsModel"
import { ArtAvgFieldsModelSelector } from "./ArtAvgFieldsModel.base"
import { ArtMaxFieldsModel } from "./ArtMaxFieldsModel"
import { ArtMaxFieldsModelSelector } from "./ArtMaxFieldsModel.base"
import { ArtMinFieldsModel } from "./ArtMinFieldsModel"
import { ArtMinFieldsModelSelector } from "./ArtMinFieldsModel.base"
import { ArtStddevFieldsModel } from "./ArtStddevFieldsModel"
import { ArtStddevFieldsModelSelector } from "./ArtStddevFieldsModel.base"
import { ArtStddevPopFieldsModel } from "./ArtStddevPopFieldsModel"
import { ArtStddevPopFieldsModelSelector } from "./ArtStddevPopFieldsModel.base"
import { ArtStddevSampFieldsModel } from "./ArtStddevSampFieldsModel"
import { ArtStddevSampFieldsModelSelector } from "./ArtStddevSampFieldsModel.base"
import { ArtSumFieldsModel } from "./ArtSumFieldsModel"
import { ArtSumFieldsModelSelector } from "./ArtSumFieldsModel.base"
import { ArtVarPopFieldsModel } from "./ArtVarPopFieldsModel"
import { ArtVarPopFieldsModelSelector } from "./ArtVarPopFieldsModel.base"
import { ArtVarSampFieldsModel } from "./ArtVarSampFieldsModel"
import { ArtVarSampFieldsModelSelector } from "./ArtVarSampFieldsModel.base"
import { ArtVarianceFieldsModel } from "./ArtVarianceFieldsModel"
import { ArtVarianceFieldsModelSelector } from "./ArtVarianceFieldsModel.base"


/**
 * ArtAggregateFieldsBase
 * auto generated base class for the model ArtAggregateFieldsModel.
 *
 * aggregate fields of "art"
 */
export const ArtAggregateFieldsModelBase = ModelBase
  .named('ArtAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_aggregate_fields"), "art_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ArtAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ArtStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ArtStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ArtStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ArtSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ArtVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ArtVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ArtVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ArtAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ArtMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ArtStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ArtStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ArtStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ArtSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ArtVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ArtVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ArtVarianceFieldsModelSelector, builder) }
}
export function selectFromArtAggregateFields() {
  return new ArtAggregateFieldsModelSelector()
}

export const artAggregateFieldsModelPrimitives = selectFromArtAggregateFields().count
