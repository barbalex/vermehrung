import { spatial_ref_sys_sum_fieldsModelBase } from "./spatial_ref_sys_sum_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_sum_fieldsModel */
export { selectFromspatial_ref_sys_sum_fields, spatial_ref_sys_sum_fieldsModelPrimitives, spatial_ref_sys_sum_fieldsModelSelector } from "./spatial_ref_sys_sum_fieldsModel.base"

/**
 * spatial_ref_sys_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const spatial_ref_sys_sum_fieldsModel = spatial_ref_sys_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
