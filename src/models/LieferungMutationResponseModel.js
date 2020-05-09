import { LieferungMutationResponseModelBase } from "./LieferungMutationResponseModel.base"


/* A graphql query fragment builders for LieferungMutationResponseModel */
export { selectFromLieferungMutationResponse, lieferungMutationResponseModelPrimitives, LieferungMutationResponseModelSelector } from "./LieferungMutationResponseModel.base"

/**
 * LieferungMutationResponseModel
 *
 * response of any mutation on the table "lieferung"
 */
export const LieferungMutationResponseModel = LieferungMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
