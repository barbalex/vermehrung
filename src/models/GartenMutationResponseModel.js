import { GartenMutationResponseModelBase } from "./GartenMutationResponseModel.base"


/* A graphql query fragment builders for GartenMutationResponseModel */
export { selectFromGartenMutationResponse, gartenMutationResponseModelPrimitives, GartenMutationResponseModelSelector } from "./GartenMutationResponseModel.base"

/**
 * GartenMutationResponseModel
 *
 * response of any mutation on the table "garten"
 */
export const GartenMutationResponseModel = GartenMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
