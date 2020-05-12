/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * spatial_ref_sys_stddev_pop_fieldsBase
 * auto generated base class for the model spatial_ref_sys_stddev_pop_fieldsModel.
 */
export const spatial_ref_sys_stddev_pop_fieldsModelBase = ModelBase
  .named('spatial_ref_sys_stddev_pop_fields')
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

export class spatial_ref_sys_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get auth_srid() { return this.__attr(`auth_srid`) }
  get srid() { return this.__attr(`srid`) }
}
export function selectFromspatial_ref_sys_stddev_pop_fields() {
  return new spatial_ref_sys_stddev_pop_fieldsModelSelector()
}

export const spatial_ref_sys_stddev_pop_fieldsModelPrimitives = selectFromspatial_ref_sys_stddev_pop_fields().auth_srid.srid
