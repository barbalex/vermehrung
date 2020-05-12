/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * spatial_ref_sys_sum_fieldsBase
 * auto generated base class for the model spatial_ref_sys_sum_fieldsModel.
 */
export const spatial_ref_sys_sum_fieldsModelBase = ModelBase
  .named('spatial_ref_sys_sum_fields')
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

export class spatial_ref_sys_sum_fieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromspatial_ref_sys_sum_fields() {
  return new spatial_ref_sys_sum_fieldsModelSelector()
}

export const spatial_ref_sys_sum_fieldsModelPrimitives = selectFromspatial_ref_sys_sum_fields().auth_srid.srid
