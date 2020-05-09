import { spatial_ref_sys_mutation_responseModelBase } from "./spatial_ref_sys_mutation_responseModel.base"


/* A graphql query fragment builders for spatial_ref_sys_mutation_responseModel */
export { selectFromspatial_ref_sys_mutation_response, spatial_ref_sys_mutation_responseModelPrimitives, spatial_ref_sys_mutation_responseModelSelector } from "./spatial_ref_sys_mutation_responseModel.base"

/**
 * spatial_ref_sys_mutation_responseModel
 *
 * response of any mutation on the table "spatial_ref_sys"
 */
export const spatial_ref_sys_mutation_responseModel = spatial_ref_sys_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
