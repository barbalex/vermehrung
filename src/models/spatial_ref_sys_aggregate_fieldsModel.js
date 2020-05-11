import { spatial_ref_sys_aggregate_fieldsModelBase } from "./spatial_ref_sys_aggregate_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_aggregate_fieldsModel */
export { selectFromspatial_ref_sys_aggregate_fields, spatial_ref_sys_aggregate_fieldsModelPrimitives, spatial_ref_sys_aggregate_fieldsModelSelector } from "./spatial_ref_sys_aggregate_fieldsModel.base"

/**
 * spatial_ref_sys_aggregate_fieldsModel
 *
 * aggregate fields of "spatial_ref_sys"
 */
export const spatial_ref_sys_aggregate_fieldsModel = spatial_ref_sys_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
