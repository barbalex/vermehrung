import { KulturOptionRevMutationResponseModelBase } from "./KulturOptionRevMutationResponseModel.base"


/* A graphql query fragment builders for KulturOptionRevMutationResponseModel */
export { selectFromKulturOptionRevMutationResponse, kulturOptionRevMutationResponseModelPrimitives, KulturOptionRevMutationResponseModelSelector } from "./KulturOptionRevMutationResponseModel.base"

/**
 * KulturOptionRevMutationResponseModel
 *
 * response of any mutation on the table "kultur_option_rev"
 */
export const KulturOptionRevMutationResponseModel = KulturOptionRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
