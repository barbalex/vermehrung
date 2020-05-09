import { spatial_ref_sys_var_pop_fieldsModelBase } from "./spatial_ref_sys_var_pop_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_var_pop_fieldsModel */
export { selectFromspatial_ref_sys_var_pop_fields, spatial_ref_sys_var_pop_fieldsModelPrimitives, spatial_ref_sys_var_pop_fieldsModelSelector } from "./spatial_ref_sys_var_pop_fieldsModel.base"

/**
 * spatial_ref_sys_var_pop_fieldsModel
 *
 * aggregate var_pop on columns
 */
export const spatial_ref_sys_var_pop_fieldsModel = spatial_ref_sys_var_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
