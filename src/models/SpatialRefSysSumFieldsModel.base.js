/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SpatialRefSysSumFieldsBase
 * auto generated base class for the model SpatialRefSysSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const SpatialRefSysSumFieldsModelBase = ModelBase
  .named('SpatialRefSysSumFields')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_sum_fields"), "spatial_ref_sys_sum_fields"),
    auth_srid: types.union(types.undefined, types.null, types.integer),
    srid: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SpatialRefSysSumFieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromSpatialRefSysSumFields() {
  return new SpatialRefSysSumFieldsModelSelector()
}

export const spatialRefSysSumFieldsModelPrimitives = selectFromSpatialRefSysSumFields().auth_srid.srid
