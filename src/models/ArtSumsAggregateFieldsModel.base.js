/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtSumsAvgFieldsModel } from "./ArtSumsAvgFieldsModel"
import { ArtSumsAvgFieldsModelSelector } from "./ArtSumsAvgFieldsModel.base"
import { ArtSumsMaxFieldsModel } from "./ArtSumsMaxFieldsModel"
import { ArtSumsMaxFieldsModelSelector } from "./ArtSumsMaxFieldsModel.base"
import { ArtSumsMinFieldsModel } from "./ArtSumsMinFieldsModel"
import { ArtSumsMinFieldsModelSelector } from "./ArtSumsMinFieldsModel.base"
import { ArtSumsStddevFieldsModel } from "./ArtSumsStddevFieldsModel"
import { ArtSumsStddevFieldsModelSelector } from "./ArtSumsStddevFieldsModel.base"
import { ArtSumsStddevPopFieldsModel } from "./ArtSumsStddevPopFieldsModel"
import { ArtSumsStddevPopFieldsModelSelector } from "./ArtSumsStddevPopFieldsModel.base"
import { ArtSumsStddevSampFieldsModel } from "./ArtSumsStddevSampFieldsModel"
import { ArtSumsStddevSampFieldsModelSelector } from "./ArtSumsStddevSampFieldsModel.base"
import { ArtSumsSumFieldsModel } from "./ArtSumsSumFieldsModel"
import { ArtSumsSumFieldsModelSelector } from "./ArtSumsSumFieldsModel.base"
import { ArtSumsVarPopFieldsModel } from "./ArtSumsVarPopFieldsModel"
import { ArtSumsVarPopFieldsModelSelector } from "./ArtSumsVarPopFieldsModel.base"
import { ArtSumsVarSampFieldsModel } from "./ArtSumsVarSampFieldsModel"
import { ArtSumsVarSampFieldsModelSelector } from "./ArtSumsVarSampFieldsModel.base"
import { ArtSumsVarianceFieldsModel } from "./ArtSumsVarianceFieldsModel"
import { ArtSumsVarianceFieldsModelSelector } from "./ArtSumsVarianceFieldsModel.base"


/**
 * ArtSumsAggregateFieldsBase
 * auto generated base class for the model ArtSumsAggregateFieldsModel.
 *
 * aggregate fields of "art_sums"
 */
export const ArtSumsAggregateFieldsModelBase = ModelBase
  .named('ArtSumsAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_sums_aggregate_fields"), "art_sums_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ArtSumsAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtSumsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtSumsMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ArtSumsStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ArtSumsStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ArtSumsStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ArtSumsSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ArtSumsVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ArtSumsVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ArtSumsVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtSumsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ArtSumsAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ArtSumsMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtSumsMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ArtSumsStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ArtSumsStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ArtSumsStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ArtSumsSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ArtSumsVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ArtSumsVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ArtSumsVarianceFieldsModelSelector, builder) }
}
export function selectFromArtSumsAggregateFields() {
  return new ArtSumsAggregateFieldsModelSelector()
}

export const artSumsAggregateFieldsModelPrimitives = selectFromArtSumsAggregateFields().count
