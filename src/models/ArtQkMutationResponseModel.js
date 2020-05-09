import { ArtQkMutationResponseModelBase } from "./ArtQkMutationResponseModel.base"


/* A graphql query fragment builders for ArtQkMutationResponseModel */
export { selectFromArtQkMutationResponse, artQkMutationResponseModelPrimitives, ArtQkMutationResponseModelSelector } from "./ArtQkMutationResponseModel.base"

/**
 * ArtQkMutationResponseModel
 *
 * response of any mutation on the table "art_qk"
 */
export const ArtQkMutationResponseModel = ArtQkMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
