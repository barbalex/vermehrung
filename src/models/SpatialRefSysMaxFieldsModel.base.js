/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysMaxFieldsBase
 * auto generated base class for the model SpatialRefSysMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const SpatialRefSysMaxFieldsModelBase = ModelBase
  .named('SpatialRefSysMaxFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_max_fields"), "spatial_ref_sys_max_fields"),
    auth_name: types.union(types.undefined, types.null, types.string),
    auth_srid: types.union(types.undefined, types.null, types.integer),
    proj4text: types.union(types.undefined, types.null, types.string),
    srid: types.union(types.undefined, types.null, types.integer),
    srtext: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysMaxFieldsModelSelector extends QueryBuilder {
  get auth_name() { return this.__attr(`auth_name`) }
  get auth_srid() { return this.__attr(`auth_srid`) }
  get proj4text() { return this.__attr(`proj4text`) }
  get srid() { return this.__attr(`srid`) }
  get srtext() { return this.__attr(`srtext`) }
}
export function selectFromSpatialRefSysMaxFields() {
  return new SpatialRefSysMaxFieldsModelSelector()
}

export const spatialRefSysMaxFieldsModelPrimitives = selectFromSpatialRefSysMaxFields().auth_name.auth_srid.proj4text.srid.srtext
