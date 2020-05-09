import { spatial_ref_sys_aggregateModelBase } from "./spatial_ref_sys_aggregateModel.base"


/* A graphql query fragment builders for spatial_ref_sys_aggregateModel */
export { selectFromspatial_ref_sys_aggregate, spatial_ref_sys_aggregateModelPrimitives, spatial_ref_sys_aggregateModelSelector } from "./spatial_ref_sys_aggregateModel.base"

/**
 * spatial_ref_sys_aggregateModel
 *
 * aggregated selection of "spatial_ref_sys"
 */
export const spatial_ref_sys_aggregateModel = spatial_ref_sys_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
