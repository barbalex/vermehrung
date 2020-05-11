/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { spatial_ref_sysModel } from "./spatial_ref_sysModel"
import { spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"
import { spatial_ref_sys_aggregate_fieldsModel } from "./spatial_ref_sys_aggregate_fieldsModel"
import { spatial_ref_sys_aggregate_fieldsModelSelector } from "./spatial_ref_sys_aggregate_fieldsModel.base"


/**
 * spatial_ref_sys_aggregateBase
 * auto generated base class for the model spatial_ref_sys_aggregateModel.
 *
 * aggregated selection of "spatial_ref_sys"
 */
export const spatial_ref_sys_aggregateModelBase = ModelBase
  .named('spatial_ref_sys_aggregate')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_aggregate"), "spatial_ref_sys_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => spatial_ref_sysModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class spatial_ref_sys_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, spatial_ref_sys_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, spatial_ref_sysModelSelector, builder) }
}
export function selectFromspatial_ref_sys_aggregate() {
  return new spatial_ref_sys_aggregateModelSelector()
}

export const spatial_ref_sys_aggregateModelPrimitives = selectFromspatial_ref_sys_aggregate()
