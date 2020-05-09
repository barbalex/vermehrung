import { LieferungFileMutationResponseModelBase } from "./LieferungFileMutationResponseModel.base"


/* A graphql query fragment builders for LieferungFileMutationResponseModel */
export { selectFromLieferungFileMutationResponse, lieferungFileMutationResponseModelPrimitives, LieferungFileMutationResponseModelSelector } from "./LieferungFileMutationResponseModel.base"

/**
 * LieferungFileMutationResponseModel
 *
 * response of any mutation on the table "lieferung_file"
 */
export const LieferungFileMutationResponseModel = LieferungFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
