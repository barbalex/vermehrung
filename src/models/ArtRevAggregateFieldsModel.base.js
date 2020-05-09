/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtRevAvgFieldsModel } from "./ArtRevAvgFieldsModel"
import { ArtRevAvgFieldsModelSelector } from "./ArtRevAvgFieldsModel.base"
import { ArtRevMaxFieldsModel } from "./ArtRevMaxFieldsModel"
import { ArtRevMaxFieldsModelSelector } from "./ArtRevMaxFieldsModel.base"
import { ArtRevMinFieldsModel } from "./ArtRevMinFieldsModel"
import { ArtRevMinFieldsModelSelector } from "./ArtRevMinFieldsModel.base"
import { ArtRevStddevFieldsModel } from "./ArtRevStddevFieldsModel"
import { ArtRevStddevFieldsModelSelector } from "./ArtRevStddevFieldsModel.base"
import { ArtRevStddevPopFieldsModel } from "./ArtRevStddevPopFieldsModel"
import { ArtRevStddevPopFieldsModelSelector } from "./ArtRevStddevPopFieldsModel.base"
import { ArtRevStddevSampFieldsModel } from "./ArtRevStddevSampFieldsModel"
import { ArtRevStddevSampFieldsModelSelector } from "./ArtRevStddevSampFieldsModel.base"
import { ArtRevSumFieldsModel } from "./ArtRevSumFieldsModel"
import { ArtRevSumFieldsModelSelector } from "./ArtRevSumFieldsModel.base"
import { ArtRevVarPopFieldsModel } from "./ArtRevVarPopFieldsModel"
import { ArtRevVarPopFieldsModelSelector } from "./ArtRevVarPopFieldsModel.base"
import { ArtRevVarSampFieldsModel } from "./ArtRevVarSampFieldsModel"
import { ArtRevVarSampFieldsModelSelector } from "./ArtRevVarSampFieldsModel.base"
import { ArtRevVarianceFieldsModel } from "./ArtRevVarianceFieldsModel"
import { ArtRevVarianceFieldsModelSelector } from "./ArtRevVarianceFieldsModel.base"


/**
 * ArtRevAggregateFieldsBase
 * auto generated base class for the model ArtRevAggregateFieldsModel.
 *
 * aggregate fields of "art_rev"
 */
export const ArtRevAggregateFieldsModelBase = ModelBase
  .named('ArtRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_rev_aggregate_fields"), "art_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ArtRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ArtRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ArtRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ArtRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ArtRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ArtRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ArtRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ArtRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ArtRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ArtRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ArtRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ArtRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ArtRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ArtRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ArtRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ArtRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ArtRevVarianceFieldsModelSelector, builder) }
}
export function selectFromArtRevAggregateFields() {
  return new ArtRevAggregateFieldsModelSelector()
}

export const artRevAggregateFieldsModelPrimitives = selectFromArtRevAggregateFields().count
