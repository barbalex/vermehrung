import { ArtMutationResponseModelBase } from "./ArtMutationResponseModel.base"


/* A graphql query fragment builders for ArtMutationResponseModel */
export { selectFromArtMutationResponse, artMutationResponseModelPrimitives, ArtMutationResponseModelSelector } from "./ArtMutationResponseModel.base"

/**
 * ArtMutationResponseModel
 *
 * response of any mutation on the table "art"
 */
export const ArtMutationResponseModel = ArtMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
