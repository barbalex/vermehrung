import { SammlungMutationResponseModelBase } from "./SammlungMutationResponseModel.base"


/* A graphql query fragment builders for SammlungMutationResponseModel */
export { selectFromSammlungMutationResponse, sammlungMutationResponseModelPrimitives, SammlungMutationResponseModelSelector } from "./SammlungMutationResponseModel.base"

/**
 * SammlungMutationResponseModel
 *
 * response of any mutation on the table "sammlung"
 */
export const SammlungMutationResponseModel = SammlungMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
