import { SammelLieferungMutationResponseModelBase } from "./SammelLieferungMutationResponseModel.base"


/* A graphql query fragment builders for SammelLieferungMutationResponseModel */
export { selectFromSammelLieferungMutationResponse, sammelLieferungMutationResponseModelPrimitives, SammelLieferungMutationResponseModelSelector } from "./SammelLieferungMutationResponseModel.base"

/**
 * SammelLieferungMutationResponseModel
 *
 * response of any mutation on the table "sammel_lieferung"
 */
export const SammelLieferungMutationResponseModel = SammelLieferungMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
