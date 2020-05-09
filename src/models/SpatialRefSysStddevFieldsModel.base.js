/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysStddevFieldsBase
 * auto generated base class for the model SpatialRefSysStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const SpatialRefSysStddevFieldsModelBase = ModelBase
  .named('SpatialRefSysStddevFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_stddev_fields"), "spatial_ref_sys_stddev_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysStddevFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysStddevFields() {
  return new SpatialRefSysStddevFieldsModelSelector()
}

export const spatialRefSysStddevFieldsModelPrimitives = selectFromSpatialRefSysStddevFields().auth_srid.srid
