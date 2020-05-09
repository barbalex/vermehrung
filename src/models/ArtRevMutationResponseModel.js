import { ArtRevMutationResponseModelBase } from "./ArtRevMutationResponseModel.base"


/* A graphql query fragment builders for ArtRevMutationResponseModel */
export { selectFromArtRevMutationResponse, artRevMutationResponseModelPrimitives, ArtRevMutationResponseModelSelector } from "./ArtRevMutationResponseModel.base"

/**
 * ArtRevMutationResponseModel
 *
 * response of any mutation on the table "art_rev"
 */
export const ArtRevMutationResponseModel = ArtRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
