import { spatial_ref_sys_variance_fieldsModelBase } from "./spatial_ref_sys_variance_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_variance_fieldsModel */
export { selectFromspatial_ref_sys_variance_fields, spatial_ref_sys_variance_fieldsModelPrimitives, spatial_ref_sys_variance_fieldsModelSelector } from "./spatial_ref_sys_variance_fieldsModel.base"

/**
 * spatial_ref_sys_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const spatial_ref_sys_variance_fieldsModel = spatial_ref_sys_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
