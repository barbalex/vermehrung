import { LieferungRevMutationResponseModelBase } from "./LieferungRevMutationResponseModel.base"


/* A graphql query fragment builders for LieferungRevMutationResponseModel */
export { selectFromLieferungRevMutationResponse, lieferungRevMutationResponseModelPrimitives, LieferungRevMutationResponseModelSelector } from "./LieferungRevMutationResponseModel.base"

/**
 * LieferungRevMutationResponseModel
 *
 * response of any mutation on the table "lieferung_rev"
 */
export const LieferungRevMutationResponseModel = LieferungRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
