/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SpatialRefSysAggregateFieldsModel } from "./SpatialRefSysAggregateFieldsModel"
import { SpatialRefSysAggregateFieldsModelSelector } from "./SpatialRefSysAggregateFieldsModel.base"
import { SpatialRefSysModel } from "./SpatialRefSysModel"
import { SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"


/**
 * SpatialRefSysAggregateBase
 * auto generated base class for the model SpatialRefSysAggregateModel.
 *
 * aggregated selection of "spatial_ref_sys"
 */
export const SpatialRefSysAggregateModelBase = ModelBase
  .named('SpatialRefSysAggregate')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_aggregate"), "spatial_ref_sys_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SpatialRefSysAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SpatialRefSysModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SpatialRefSysAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SpatialRefSysModelSelector, builder) }
}
export function selectFromSpatialRefSysAggregate() {
  return new SpatialRefSysAggregateModelSelector()
}

export const spatialRefSysAggregateModelPrimitives = selectFromSpatialRefSysAggregate()
