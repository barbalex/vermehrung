import { ArtFileMutationResponseModelBase } from "./ArtFileMutationResponseModel.base"


/* A graphql query fragment builders for ArtFileMutationResponseModel */
export { selectFromArtFileMutationResponse, artFileMutationResponseModelPrimitives, ArtFileMutationResponseModelSelector } from "./ArtFileMutationResponseModel.base"

/**
 * ArtFileMutationResponseModel
 *
 * response of any mutation on the table "art_file"
 */
export const ArtFileMutationResponseModel = ArtFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
