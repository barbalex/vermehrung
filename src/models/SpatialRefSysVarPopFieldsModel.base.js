/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysVarPopFieldsBase
 * auto generated base class for the model SpatialRefSysVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const SpatialRefSysVarPopFieldsModelBase = ModelBase
  .named('SpatialRefSysVarPopFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_var_pop_fields"), "spatial_ref_sys_var_pop_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysVarPopFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysVarPopFields() {
  return new SpatialRefSysVarPopFieldsModelSelector()
}

export const spatialRefSysVarPopFieldsModelPrimitives = selectFromSpatialRefSysVarPopFields().auth_srid.srid
