/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SpatialRefSysAvgFieldsModel } from "./SpatialRefSysAvgFieldsModel"
import { SpatialRefSysAvgFieldsModelSelector } from "./SpatialRefSysAvgFieldsModel.base"
import { SpatialRefSysMaxFieldsModel } from "./SpatialRefSysMaxFieldsModel"
import { SpatialRefSysMaxFieldsModelSelector } from "./SpatialRefSysMaxFieldsModel.base"
import { SpatialRefSysMinFieldsModel } from "./SpatialRefSysMinFieldsModel"
import { SpatialRefSysMinFieldsModelSelector } from "./SpatialRefSysMinFieldsModel.base"
import { SpatialRefSysStddevFieldsModel } from "./SpatialRefSysStddevFieldsModel"
import { SpatialRefSysStddevFieldsModelSelector } from "./SpatialRefSysStddevFieldsModel.base"
import { SpatialRefSysStddevPopFieldsModel } from "./SpatialRefSysStddevPopFieldsModel"
import { SpatialRefSysStddevPopFieldsModelSelector } from "./SpatialRefSysStddevPopFieldsModel.base"
import { SpatialRefSysStddevSampFieldsModel } from "./SpatialRefSysStddevSampFieldsModel"
import { SpatialRefSysStddevSampFieldsModelSelector } from "./SpatialRefSysStddevSampFieldsModel.base"
import { SpatialRefSysSumFieldsModel } from "./SpatialRefSysSumFieldsModel"
import { SpatialRefSysSumFieldsModelSelector } from "./SpatialRefSysSumFieldsModel.base"
import { SpatialRefSysVarPopFieldsModel } from "./SpatialRefSysVarPopFieldsModel"
import { SpatialRefSysVarPopFieldsModelSelector } from "./SpatialRefSysVarPopFieldsModel.base"
import { SpatialRefSysVarSampFieldsModel } from "./SpatialRefSysVarSampFieldsModel"
import { SpatialRefSysVarSampFieldsModelSelector } from "./SpatialRefSysVarSampFieldsModel.base"
import { SpatialRefSysVarianceFieldsModel } from "./SpatialRefSysVarianceFieldsModel"
import { SpatialRefSysVarianceFieldsModelSelector } from "./SpatialRefSysVarianceFieldsModel.base"


/**
 * SpatialRefSysAggregateFieldsBase
 * auto generated base class for the model SpatialRefSysAggregateFieldsModel.
 *
 * aggregate fields of "spatial_ref_sys"
 */
export const SpatialRefSysAggregateFieldsModelBase = ModelBase
  .named('SpatialRefSysAggregateFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_aggregate_fields"), "spatial_ref_sys_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => SpatialRefSysAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SpatialRefSysMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SpatialRefSysMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => SpatialRefSysStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => SpatialRefSysStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => SpatialRefSysStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => SpatialRefSysSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => SpatialRefSysVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => SpatialRefSysVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => SpatialRefSysVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, SpatialRefSysAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, SpatialRefSysMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SpatialRefSysMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, SpatialRefSysStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, SpatialRefSysStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, SpatialRefSysStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, SpatialRefSysSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, SpatialRefSysVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, SpatialRefSysVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, SpatialRefSysVarianceFieldsModelSelector, builder) }
}
export function selectFromSpatialRefSysAggregateFields() {
  return new SpatialRefSysAggregateFieldsModelSelector()
}

export const spatialRefSysAggregateFieldsModelPrimitives = selectFromSpatialRefSysAggregateFields().count
