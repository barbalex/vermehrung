/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysStddevSampFieldsBase
 * auto generated base class for the model SpatialRefSysStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const SpatialRefSysStddevSampFieldsModelBase = ModelBase
  .named('SpatialRefSysStddevSampFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_stddev_samp_fields"), "spatial_ref_sys_stddev_samp_fields"),
    auth_srid: types.union(types.undefined, types.null, types.number),
    srid: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysStddevSampFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysStddevSampFields() {
  return new SpatialRefSysStddevSampFieldsModelSelector()
}

export const spatialRefSysStddevSampFieldsModelPrimitives = selectFromSpatialRefSysStddevSampFields().auth_srid.srid
