import { SammelLieferungRevMutationResponseModelBase } from "./SammelLieferungRevMutationResponseModel.base"


/* A graphql query fragment builders for SammelLieferungRevMutationResponseModel */
export { selectFromSammelLieferungRevMutationResponse, sammelLieferungRevMutationResponseModelPrimitives, SammelLieferungRevMutationResponseModelSelector } from "./SammelLieferungRevMutationResponseModel.base"

/**
 * SammelLieferungRevMutationResponseModel
 *
 * response of any mutation on the table "sammel_lieferung_rev"
 */
export const SammelLieferungRevMutationResponseModel = SammelLieferungRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
