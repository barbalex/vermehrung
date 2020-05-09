import { spatial_ref_sys_max_fieldsModelBase } from "./spatial_ref_sys_max_fieldsModel.base"


/* A graphql query fragment builders for spatial_ref_sys_max_fieldsModel */
export { selectFromspatial_ref_sys_max_fields, spatial_ref_sys_max_fieldsModelPrimitives, spatial_ref_sys_max_fieldsModelSelector } from "./spatial_ref_sys_max_fieldsModel.base"

/**
 * spatial_ref_sys_max_fieldsModel
 *
 * aggregate max on columns
 */
export const spatial_ref_sys_max_fieldsModel = spatial_ref_sys_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
