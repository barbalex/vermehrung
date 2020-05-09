import { GartenFileMutationResponseModelBase } from "./GartenFileMutationResponseModel.base"


/* A graphql query fragment builders for GartenFileMutationResponseModel */
export { selectFromGartenFileMutationResponse, gartenFileMutationResponseModelPrimitives, GartenFileMutationResponseModelSelector } from "./GartenFileMutationResponseModel.base"

/**
 * GartenFileMutationResponseModel
 *
 * response of any mutation on the table "garten_file"
 */
export const GartenFileMutationResponseModel = GartenFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
