/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysVarSampFieldsBase
 * auto generated base class for the model SpatialRefSysVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const SpatialRefSysVarSampFieldsModelBase = ModelBase
  .named('SpatialRefSysVarSampFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_var_samp_fields"), "spatial_ref_sys_var_samp_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysVarSampFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysVarSampFields() {
  return new SpatialRefSysVarSampFieldsModelSelector()
}

export const spatialRefSysVarSampFieldsModelPrimitives = selectFromSpatialRefSysVarSampFields().auth_srid.srid
