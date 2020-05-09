import { spatial_ref_sys_avg_fieldsModelBase } from "./spatial_ref_sys_avg_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_avg_fieldsModel */
export { selectFromspatial_ref_sys_avg_fields, spatial_ref_sys_avg_fieldsModelPrimitives, spatial_ref_sys_avg_fieldsModelSelector } from "./spatial_ref_sys_avg_fieldsModel.base"

/**
 * spatial_ref_sys_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const spatial_ref_sys_avg_fieldsModel = spatial_ref_sys_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
