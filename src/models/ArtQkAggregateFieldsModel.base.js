/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkAvgFieldsModel } from "./ArtQkAvgFieldsModel"
import { ArtQkAvgFieldsModelSelector } from "./ArtQkAvgFieldsModel.base"
import { ArtQkMaxFieldsModel } from "./ArtQkMaxFieldsModel"
import { ArtQkMaxFieldsModelSelector } from "./ArtQkMaxFieldsModel.base"
import { ArtQkMinFieldsModel } from "./ArtQkMinFieldsModel"
import { ArtQkMinFieldsModelSelector } from "./ArtQkMinFieldsModel.base"
import { ArtQkStddevFieldsModel } from "./ArtQkStddevFieldsModel"
import { ArtQkStddevFieldsModelSelector } from "./ArtQkStddevFieldsModel.base"
import { ArtQkStddevPopFieldsModel } from "./ArtQkStddevPopFieldsModel"
import { ArtQkStddevPopFieldsModelSelector } from "./ArtQkStddevPopFieldsModel.base"
import { ArtQkStddevSampFieldsModel } from "./ArtQkStddevSampFieldsModel"
import { ArtQkStddevSampFieldsModelSelector } from "./ArtQkStddevSampFieldsModel.base"
import { ArtQkSumFieldsModel } from "./ArtQkSumFieldsModel"
import { ArtQkSumFieldsModelSelector } from "./ArtQkSumFieldsModel.base"
import { ArtQkVarPopFieldsModel } from "./ArtQkVarPopFieldsModel"
import { ArtQkVarPopFieldsModelSelector } from "./ArtQkVarPopFieldsModel.base"
import { ArtQkVarSampFieldsModel } from "./ArtQkVarSampFieldsModel"
import { ArtQkVarSampFieldsModelSelector } from "./ArtQkVarSampFieldsModel.base"
import { ArtQkVarianceFieldsModel } from "./ArtQkVarianceFieldsModel"
import { ArtQkVarianceFieldsModelSelector } from "./ArtQkVarianceFieldsModel.base"


/**
 * ArtQkAggregateFieldsBase
 * auto generated base class for the model ArtQkAggregateFieldsModel.
 *
 * aggregate fields of "art_qk"
 */
export const ArtQkAggregateFieldsModelBase = ModelBase
  .named('ArtQkAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_qk_aggregate_fields"), "art_qk_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => ArtQkAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtQkMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtQkMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => ArtQkStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => ArtQkStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => ArtQkStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => ArtQkSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => ArtQkVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => ArtQkVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => ArtQkVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, ArtQkAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, ArtQkMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtQkMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, ArtQkStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, ArtQkStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, ArtQkStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, ArtQkSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, ArtQkVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, ArtQkVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, ArtQkVarianceFieldsModelSelector, builder) }
}
export function selectFromArtQkAggregateFields() {
  return new ArtQkAggregateFieldsModelSelector()
}

export const artQkAggregateFieldsModelPrimitives = selectFromArtQkAggregateFields().count
