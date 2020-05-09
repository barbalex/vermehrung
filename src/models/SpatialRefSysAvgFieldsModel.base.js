/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysAvgFieldsBase
 * auto generated base class for the model SpatialRefSysAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const SpatialRefSysAvgFieldsModelBase = ModelBase
  .named('SpatialRefSysAvgFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_avg_fields"), "spatial_ref_sys_avg_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysAvgFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysAvgFields() {
  return new SpatialRefSysAvgFieldsModelSelector()
}

export const spatialRefSysAvgFieldsModelPrimitives = selectFromSpatialRefSysAvgFields().auth_srid.srid
