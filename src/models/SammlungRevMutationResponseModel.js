import { SammlungRevMutationResponseModelBase } from "./SammlungRevMutationResponseModel.base"


/* A graphql query fragment builders for SammlungRevMutationResponseModel */
export { selectFromSammlungRevMutationResponse, sammlungRevMutationResponseModelPrimitives, SammlungRevMutationResponseModelSelector } from "./SammlungRevMutationResponseModel.base"

/**
 * SammlungRevMutationResponseModel
 *
 * response of any mutation on the table "sammlung_rev"
 */
export const SammlungRevMutationResponseModel = SammlungRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
