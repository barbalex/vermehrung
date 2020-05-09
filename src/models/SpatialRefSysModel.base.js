/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysBase
 * auto generated base class for the model SpatialRefSysModel.
 *
 * columns and relationships of "spatial_ref_sys"
 */
export const SpatialRefSysModelBase = ModelBase
  .named('SpatialRefSys')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys"), "spatial_ref_sys"),
    auth_name: types.union(types.undefined, types.null, types.string),
    auth_srid: types.union(types.undefined, types.null, types.integer),
    proj4text: types.union(types.undefined, types.null, types.string),
    srid: types.union(types.undefined, types.integer),
    srtext: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysModelSelector extends QueryBuilder {
  get auth_name() { return this.__attr(`auth_name`) }
  get auth_srid() { return this.__attr(`auth_srid`) }
  get proj4text() { return this.__attr(`proj4text`) }
  get srid() { return this.__attr(`srid`) }
  get srtext() { return this.__attr(`srtext`) }
}
export function selectFromSpatialRefSys() {
  return new SpatialRefSysModelSelector()
}

export const spatialRefSysModelPrimitives = selectFromSpatialRefSys().auth_name.auth_srid.proj4text.srid.srtext
