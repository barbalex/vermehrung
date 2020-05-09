import { SpatialRefSysMutationResponseModelBase } from "./SpatialRefSysMutationResponseModel.base"


/* A graphql query fragment builders for SpatialRefSysMutationResponseModel */
export { selectFromSpatialRefSysMutationResponse, spatialRefSysMutationResponseModelPrimitives, SpatialRefSysMutationResponseModelSelector } from "./SpatialRefSysMutationResponseModel.base"

/**
 * SpatialRefSysMutationResponseModel
 *
 * response of any mutation on the table "spatial_ref_sys"
 */
export const SpatialRefSysMutationResponseModel = SpatialRefSysMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
