import { KulturFileMutationResponseModelBase } from "./KulturFileMutationResponseModel.base"


/* A graphql query fragment builders for KulturFileMutationResponseModel */
export { selectFromKulturFileMutationResponse, kulturFileMutationResponseModelPrimitives, KulturFileMutationResponseModelSelector } from "./KulturFileMutationResponseModel.base"

/**
 * KulturFileMutationResponseModel
 *
 * response of any mutation on the table "kultur_file"
 */
export const KulturFileMutationResponseModel = KulturFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
