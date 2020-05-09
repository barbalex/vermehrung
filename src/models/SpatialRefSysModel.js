import { SpatialRefSysModelBase } from "./SpatialRefSysModel.base"


/* A graphql query fragment builders for SpatialRefSysModel */
export { selectFromSpatialRefSys, spatialRefSysModelPrimitives, SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"

/**
 * SpatialRefSysModel
 *
 * columns and relationships of "spatial_ref_sys"
 */
export const SpatialRefSysModel = SpatialRefSysModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
