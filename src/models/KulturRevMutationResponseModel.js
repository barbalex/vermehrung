import { KulturRevMutationResponseModelBase } from "./KulturRevMutationResponseModel.base"


/* A graphql query fragment builders for KulturRevMutationResponseModel */
export { selectFromKulturRevMutationResponse, kulturRevMutationResponseModelPrimitives, KulturRevMutationResponseModelSelector } from "./KulturRevMutationResponseModel.base"

/**
 * KulturRevMutationResponseModel
 *
 * response of any mutation on the table "kultur_rev"
 */
export const KulturRevMutationResponseModel = KulturRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
