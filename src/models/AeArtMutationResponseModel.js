import { AeArtMutationResponseModelBase } from "./AeArtMutationResponseModel.base"


/* A graphql query fragment builders for AeArtMutationResponseModel */
export { selectFromAeArtMutationResponse, aeArtMutationResponseModelPrimitives, AeArtMutationResponseModelSelector } from "./AeArtMutationResponseModel.base"

/**
 * AeArtMutationResponseModel
 *
 * response of any mutation on the table "ae_art"
 */
export const AeArtMutationResponseModel = AeArtMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
