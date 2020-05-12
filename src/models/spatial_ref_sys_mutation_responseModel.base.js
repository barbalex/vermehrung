/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { spatial_ref_sysModel } from "./spatial_ref_sysModel"
import { spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"


/**
 * spatial_ref_sys_mutation_responseBase
 * auto generated base class for the model spatial_ref_sys_mutation_responseModel.
 */
export const spatial_ref_sys_mutation_responseModelBase = ModelBase
  .named('spatial_ref_sys_mutation_response')
  .props({
    __typename: types.optional(types.literal("spatial_ref_sys_mutation_response"), "spatial_ref_sys_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(types.late(() => spatial_ref_sysModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class spatial_ref_sys_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, spatial_ref_sysModelSelector, builder) }
}
export function selectFromspatial_ref_sys_mutation_response() {
  return new spatial_ref_sys_mutation_responseModelSelector()
}

export const spatial_ref_sys_mutation_responseModelPrimitives = selectFromspatial_ref_sys_mutation_response().affected_rows
