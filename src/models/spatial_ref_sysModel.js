import { spatial_ref_sysModelBase } from "./spatial_ref_sysModel.base"


/* A graphql query fragment builders for spatial_ref_sysModel */
export { selectFromspatial_ref_sys, spatial_ref_sysModelPrimitives, spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"

/**
 * spatial_ref_sysModel
 */
export const spatial_ref_sysModel = spatial_ref_sysModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
