import { GartenRevMutationResponseModelBase } from "./GartenRevMutationResponseModel.base"


/* A graphql query fragment builders for GartenRevMutationResponseModel */
export { selectFromGartenRevMutationResponse, gartenRevMutationResponseModelPrimitives, GartenRevMutationResponseModelSelector } from "./GartenRevMutationResponseModel.base"

/**
 * GartenRevMutationResponseModel
 *
 * response of any mutation on the table "garten_rev"
 */
export const GartenRevMutationResponseModel = GartenRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
