/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysStddevPopFieldsBase
 * auto generated base class for the model SpatialRefSysStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const SpatialRefSysStddevPopFieldsModelBase = ModelBase
  .named('SpatialRefSysStddevPopFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_stddev_pop_fields"), "spatial_ref_sys_stddev_pop_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysStddevPopFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysStddevPopFields() {
  return new SpatialRefSysStddevPopFieldsModelSelector()
}

export const spatialRefSysStddevPopFieldsModelPrimitives = selectFromSpatialRefSysStddevPopFields().auth_srid.srid
