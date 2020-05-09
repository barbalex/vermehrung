/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysVarianceFieldsBase
 * auto generated base class for the model SpatialRefSysVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const SpatialRefSysVarianceFieldsModelBase = ModelBase
  .named('SpatialRefSysVarianceFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_variance_fields"), "spatial_ref_sys_variance_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysVarianceFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysVarianceFields() {
  return new SpatialRefSysVarianceFieldsModelSelector()
}

export const spatialRefSysVarianceFieldsModelPrimitives = selectFromSpatialRefSysVarianceFields().auth_srid.srid
