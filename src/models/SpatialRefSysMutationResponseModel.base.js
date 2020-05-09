/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SpatialRefSysModel } from "./SpatialRefSysModel"
import { SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"


/**
 * SpatialRefSysMutationResponseBase
 * auto generated base class for the model SpatialRefSysMutationResponseModel.
 *
 * response of any mutation on the table "spatial_ref_sys"
 */
export const SpatialRefSysMutationResponseModelBase = ModelBase
  .named('SpatialRefSysMutationResponse')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_mutation_response"), "spatial_ref_sys_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SpatialRefSysModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SpatialRefSysModelSelector, builder) }
}
export function selectFromSpatialRefSysMutationResponse() {
  return new SpatialRefSysMutationResponseModelSelector()
}

export const spatialRefSysMutationResponseModelPrimitives = selectFromSpatialRefSysMutationResponse().affected_rows
