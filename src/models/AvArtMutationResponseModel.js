import { AvArtMutationResponseModelBase } from "./AvArtMutationResponseModel.base"


/* A graphql query fragment builders for AvArtMutationResponseModel */
export { selectFromAvArtMutationResponse, avArtMutationResponseModelPrimitives, AvArtMutationResponseModelSelector } from "./AvArtMutationResponseModel.base"

/**
 * AvArtMutationResponseModel
 *
 * response of any mutation on the table "av_art"
 */
export const AvArtMutationResponseModel = AvArtMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
