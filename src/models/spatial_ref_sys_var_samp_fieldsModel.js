import { spatial_ref_sys_var_samp_fieldsModelBase } from "./spatial_ref_sys_var_samp_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_var_samp_fieldsModel */
export { selectFromspatial_ref_sys_var_samp_fields, spatial_ref_sys_var_samp_fieldsModelPrimitives, spatial_ref_sys_var_samp_fieldsModelSelector } from "./spatial_ref_sys_var_samp_fieldsModel.base"

/**
 * spatial_ref_sys_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const spatial_ref_sys_var_samp_fieldsModel = spatial_ref_sys_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
