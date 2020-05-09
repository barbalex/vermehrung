import { SammlungFileMutationResponseModelBase } from "./SammlungFileMutationResponseModel.base"


/* A graphql query fragment builders for SammlungFileMutationResponseModel */
export { selectFromSammlungFileMutationResponse, sammlungFileMutationResponseModelPrimitives, SammlungFileMutationResponseModelSelector } from "./SammlungFileMutationResponseModel.base"

/**
 * SammlungFileMutationResponseModel
 *
 * response of any mutation on the table "sammlung_file"
 */
export const SammlungFileMutationResponseModel = SammlungFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
