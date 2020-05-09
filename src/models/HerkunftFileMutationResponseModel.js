import { HerkunftFileMutationResponseModelBase } from "./HerkunftFileMutationResponseModel.base"


/* A graphql query fragment builders for HerkunftFileMutationResponseModel */
export { selectFromHerkunftFileMutationResponse, herkunftFileMutationResponseModelPrimitives, HerkunftFileMutationResponseModelSelector } from "./HerkunftFileMutationResponseModel.base"

/**
 * HerkunftFileMutationResponseModel
 *
 * response of any mutation on the table "herkunft_file"
 */
export const HerkunftFileMutationResponseModel = HerkunftFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
